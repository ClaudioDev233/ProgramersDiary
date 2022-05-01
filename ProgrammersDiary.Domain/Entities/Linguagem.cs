using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProgrammersDiary.Domain.Entities.Shared;

namespace ProgrammersDiary.Domain.Entities
{
    public class Linguagem : Entity
    {
        public List<Card>? Cards { get; set; }
    }
}