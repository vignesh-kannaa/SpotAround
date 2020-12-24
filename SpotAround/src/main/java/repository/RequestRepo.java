package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import model.RequestsModel;

public interface RequestRepo extends JpaRepository<RequestsModel, Integer>{

	
	List<RequestsModel> findByFromId(String id);
	List<RequestsModel> findByToId(String id);
	@Modifying
	@Transactional
	@Query(value="delete from requests  where from_id=:fromId and to_id=:toId and start_date=:startDate", nativeQuery = true)
	void cancelRequest(@Param("fromId")String fromId,@Param("toId")String toId,@Param("startDate")String startDate);
	@Modifying
	@Transactional
	@Query(value="update requests set status=:status where from_id=:fromId and to_id=:toId and start_date=:startDate", nativeQuery = true)
	void updateStatus(@Param("fromId")String fromId,@Param("toId")String toId,@Param("startDate")String startDate,@Param("status")String status);
}
