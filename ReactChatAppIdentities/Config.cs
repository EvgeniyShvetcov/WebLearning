using System.Collections.Generic;
using System.Security.Claims;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace ReactChatAppIdentities
{
    public class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("reactchat", "React Chat Demo")
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "reactchat",
                    ClientName = "React Chat Demo",

                    //no interactive user, use the clientid/secret for authentification
                    AllowedGrantTypes =  GrantTypes.Implicit,
					ClientSecrets =
					{
						new Secret("secret".Sha256())
					},
                    RedirectUris = {"http://localhost:3000/",},
                    PostLogoutRedirectUris = {"http://localhost:5002/Account/Logout"},
                    AllowedCorsOrigins = {"http://localhost:3000"},

                    AccessTokenLifetime = 3600, // секунд, это значение по умолчанию
					IdentityTokenLifetime = 3600, // секунд, это значение по умолчанию
					
					RequireConsent = false, // we don't want the "Consent" Screen
					AllowRememberConsent = false, 
					AlwaysSendClientClaims = true,
					AlwaysIncludeUserClaimsInIdToken = true,

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
						"reactchat"
                    }
                }
            };
        }

        internal static List<TestUser> GetUsers()
        {
            return new List<TestUser> {
            new TestUser
            {
                SubjectId = "1",
                Username = "juergen@gutsch-online.de",
                Claims = new []{ new Claim("name", "Juergen Gutsch") },
                Password ="Hello01!"
            },
            new TestUser
            {
                SubjectId = "2",
                Username = "LehaValera@mail.ru",
                Claims = new []{new Claim("name", "Leha Valera") },
                Password = "1234"
            },
            new TestUser
            {
                SubjectId = "3",
                Username = "JekaValera@mail.ru",
                Claims = new[]{new Claim("name", "Jeka Valera")},
                Password = "12345"
            }
            };
        }
    }
}