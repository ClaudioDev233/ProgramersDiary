using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProgrammersDiary.Domain.Entities;
using ProgrammersDiary.Domain.Interfaces;

namespace ProgrammersDiary.BackEnd.Controllers
{
    [Route("[controller]")]
    public class CardController : Controller
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet("{id}")]
        public ActionResult<Card?> GetId(int id) {
            Card card = _cardService.ObterPorId(id); 
            if(card is null) 
                return  NotFound();

            return Ok(card);
        }

        [HttpPost]
        public ActionResult CriarCard(Card card) {
            _cardService.Criar(card);
            return CreatedAtAction(nameof(GetId), new {Id = card.Id},card.Id);
        }
    }
}