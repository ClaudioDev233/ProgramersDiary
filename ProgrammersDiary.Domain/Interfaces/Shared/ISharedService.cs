using ProgrammersDiary.Domain.Entities.Shared;

namespace ProgrammersDiary.Domain.Interfaces.Shared
{
    public interface ISharedService<TEntity>: IDisposable where TEntity: Entity
    {
        public List<TEntity> ObterTodos();
        public TEntity? ObterPorId(int id);
    }
}