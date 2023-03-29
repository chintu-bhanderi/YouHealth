using System.ComponentModel.DataAnnotations;

namespace HospitalManagementApi.Models
{
    public class Patient
    {
       /* [Required]
        [Key]*/
        public long Id { get; set; }

        /*[Required]*/
        public string? Name { get; set; }

        /*  [Required]
          [EmailAddress]*/
        public string Email { get; set; } = string.Empty;

        /*[Required]*/
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();

        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        /* [Required]*/
        public string? Gender { get; set; }

      /*  [Required]
        [Phone]*/
        public string? Mobile { get; set; }

     /*   [Required]
        [Range(0, 150, ErrorMessage = "Age is between 0 to 150")]*/
        public int Age { get; set; }

       /* [Required]*/
        public string? Address { get; set; }

    }
}
