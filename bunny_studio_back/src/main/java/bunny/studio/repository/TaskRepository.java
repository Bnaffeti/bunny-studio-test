package bunny.studio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bunny.studio.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{

    List<Task> findByUser(long userId);
}
