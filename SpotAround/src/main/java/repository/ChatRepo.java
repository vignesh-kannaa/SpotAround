package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import model.ChatModel;


public interface ChatRepo extends JpaRepository<ChatModel, Integer>{

	@Transactional
	@Query(value="select * from chat_details where from_id=:fromid and to_id=:toid union all select * from chat_details where from_id=:toid and to_id=:fromid order by created_time;", nativeQuery = true)
	List<ChatModel> findchats(@Param("fromid")String fromid,@Param("toid")String toid);
	
}



