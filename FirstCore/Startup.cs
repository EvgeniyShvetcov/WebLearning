using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace FirstCore
{
    public class Startup
    {
        protected IHostingEnvironment _env { set; get; }
        public Startup(IHostingEnvironment env)
        {
            _env = env;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
         {
            services.AddCors();
            services.AddMvc();
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
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseCors((builder) =>
            { 
                builder.WithOrigins("https://localhost:5000")
                              .AllowAnyMethod()
                              .AllowAnyOrigin()
                              .AllowAnyHeader();
            });
            app.UseMvc ((routes) =>
			{
				routes.MapRoute(name: "default",
				template: "{controller}/{action=Index}/{id?}");
			});
        }
    }
}
