using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProgrammersDiary.Domain.Entities.Shared;

namespace ProgrammersDiary.Domain.Entities
{
    public class Card : Entity
    {
        public string Descricao { get; set; }
        public int LinguagemId { get; set; }
        public Linguagem Linguagem { get; set; }
    }
}