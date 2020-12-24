package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import model.LogIn;


public interface LogInRepo extends JpaRepository<LogIn, Integer>{

	
	LogIn findByEmail(String email);
	@Modifying
	@Transactional
	@Query(value="update log_in set password=:password where email=:email", nativeQuery = true)
	void updatepassword(@Param("password")String password,@Param("email")String email);
}
