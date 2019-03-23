using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using ReactChatApp.Data;
using ReactChatApp.Hubs;
using ReactChatApp.Services;

namespace ReactChatApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string userSecret = Configuration["ReactChatDev"];

            services.AddCors(options =>
            {
                options.AddPolicy("ReactChatCors", builder =>
                    builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                );
            });

            var tokenValidationParameters = new TokenValidationParameters()
            {
                RequireSignedTokens = true,
                RequireExpirationTime = true,
                ValidIssuer = "http://localhost:5002",
                ValidAudience = "reactchat",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(userSecret)),
                NameClaimType = "name",
                ValidateLifetime = true,
                LifetimeValidator = (before, expires, token, param) =>
                {
                    return expires > DateTime.UtcNow;
                },
            };

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler
            {
                InboundClaimTypeMap = new Dictionary<string, string>()
            };


            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.Authority = "http://localhost:5002";
                    options.RequireHttpsMetadata = false;
                    options.Audience = "reactchat";
                    options.IncludeErrorDetails = true;
                    options.SaveToken = true;
                    options.SecurityTokenValidators.Clear();
                    options.SecurityTokenValidators.Add(jwtSecurityTokenHandler);
                    options.TokenValidationParameters = tokenValidationParameters;
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) &&
                                    (path.StartsWithSegments("/chat")))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            var te = context.Exception;
                            return Task.CompletedTask;
                        }
                    };

                });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddDbContext<ChatContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("ChatContext"));
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
                {
                    configuration.RootPath = "ClientApp/build";
                });

            services.AddSignalR();
            services.AddScoped<IChatService, ChatService>();
            services.AddSingleton<IUserTracker, UserTracker>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseCors("ReactChatCors");
            app.UseWebSockets();
            app.UseAuthentication();
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSignalR(routes =>
            {
                routes.MapHub<ChatHub>("/chat");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
