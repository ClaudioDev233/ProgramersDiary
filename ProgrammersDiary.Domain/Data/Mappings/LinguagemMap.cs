using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProgrammersDiary.Domain.Entities;

namespace ProgrammersDiary.Domain.Data.Mappings
{
    public class LinguagemMap : IEntityTypeConfiguration<Linguagem>
    {
        public void Configure(EntityTypeBuilder<Linguagem> builder)
        {
            builder.HasKey(linguagem => linguagem.Id);

            builder.Property(linguagem => linguagem.Nome)
            .HasColumnType("varchar(100)");

            builder.Property(linguagem => linguagem.LabelLinguagem).HasColumnType("varchar(50)");
        }
    }
}