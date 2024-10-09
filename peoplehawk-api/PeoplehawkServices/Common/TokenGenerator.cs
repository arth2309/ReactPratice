using System.Security.Cryptography;

namespace PeoplehawkServices.Common
{
    public static class TokenGenerator
    {
        public static string GenerateToken()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new char[7];
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] data = new byte[7];
                rng.GetBytes(data);
                for (int i = 0; i < 7; i++)
                {
                    random[i] = chars[data[i] % chars.Length];
                }
            }
            return new string(random);
        }
    }
}
