package repository;





import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import model.Users;

public interface UsersRepo extends JpaRepository<Users, Integer>{

	@Transactional
	Users findByEmail(String email);
	
//	@Modifying
//	@Transactional
//	@Query(value="update spotaround.users set first_name=:firstName , last_name=:lastName,profile_path=:profile where email=:email", nativeQuery = true)
//	void updateUserName(@Param("firstName")String firstName,@Param("lastName")String lastName,@Param("profile")String profile,@Param("email")String email);
//	
	@Transactional
	@Query(value="select * from users where email in (select distinct from_id from chat_details where  to_id=:id union "
			+ "select distinct to_id from chat_details where  from_id=:id)",nativeQuery=true)
	List<Users> findChatUsers(@Param("id") String id);
}
