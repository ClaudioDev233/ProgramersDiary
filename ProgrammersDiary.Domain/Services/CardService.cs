using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProgrammersDiary.Domain.Data.Context;
using ProgrammersDiary.Domain.Entities;
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

        public void Dispose()
        {
            _context.Dispose();
        }

        public Card? ObterPorId(int id)
        {
            return _context.Cards.Include(card => card.Linguagem).FirstOrDefault(card => card.Id == id);
        }

        public List<Card> ObterTodos()
        {
            throw new NotImplementedException();
        }
    }
}