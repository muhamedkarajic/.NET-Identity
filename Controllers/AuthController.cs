using IdentityAuth.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using IdentityAuth.ViewModels;
using System.Threading.Tasks;
using System;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace IdentityAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;
        private IConfiguration configuration;
        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.configuration = configuration;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<string> GetRequest()
        {
            return "Auth user";
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<dynamic>> Register(RegisterVM registerVM)
        {
            try
            {
                var user = new ApplicationUser { UserName = registerVM.Email, Email = registerVM.Email, EmailConfirmed = true };
                var result = await userManager.CreateAsync(user, registerVM.Password);
                if (result.Succeeded)
                {
                    await signInManager.SignInAsync(user, isPersistent: false);

                    return CreateToken(user);
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            catch (System.Exception err)
            {
                throw err;
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<dynamic>> Login(LoginVM loginVM)
        {
            try
            {
                Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(loginVM.Email,
                           loginVM.Password, loginVM.RememberMe, lockoutOnFailure: true);

                if (result.Succeeded)
                {
                    var user = await userManager.FindByNameAsync(loginVM.Email);
                    return CreateToken(user);
                }
                else
                {
                    throw new System.Exception("Email or password not valid!");
                }
            }
            catch (System.Exception err)
            {
                throw err;
            }
        }

        private dynamic CreateToken(IdentityUser user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Id)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(configuration.GetSection("AppSettings:Token").Value));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return new {Token = tokenHandler.WriteToken(token)};
        }
    }
}