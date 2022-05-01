using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProgrammersDiary.Domain.Data.Context;
using ProgrammersDiary.Domain.Interfaces;

namespace ProgrammersDiary.Domain.Services
{
    public class CardService : ICardService
    {
        private readonly DataContext _context;

        public CardService(DataContext context)
        {
            _context = context;
        }
    }
}