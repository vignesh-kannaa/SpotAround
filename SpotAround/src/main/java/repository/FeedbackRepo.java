package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.FeedBackModel;


public interface FeedbackRepo extends JpaRepository<FeedBackModel, Integer>{

	List<FeedBackModel> findBytoId(String id);
	List<FeedBackModel> findByfromId(String id);
	@Query(value="select rating from feedback where from_id=:fromId and to_id=:toId", nativeQuery = true)
	Float findFeedback(@Param("fromId")String fromId,@Param("toId")String toId);
}
