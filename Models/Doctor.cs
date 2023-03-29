using System.ComponentModel.DataAnnotations;

namespace HospitalManagementApi.Models
{
    public class Doctor
    {
/*        [Required]
        [Key]*/
        public long Id { get; set; }

        /*[Required]*/
        public string? Name { get; set; }

       /* [Required]
        [EmailAddress]*/
        public string Email { get; set; } = string.Empty;

        /*[Required]*/
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();

        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        /*   [Required]*/
        public string? Gender { get; set; }

       /* [Required]
        [Phone] */
        public string? Mobile { get; set; }

       /* [Required]*/
        public string? Department { get; set; }
/*
        [Required]*/
        public string? Address { get; set; }

    }
}
