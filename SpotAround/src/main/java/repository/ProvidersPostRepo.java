package repository;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.ProvidersPostModel;



public interface ProvidersPostRepo extends JpaRepository<ProvidersPostModel,Integer> {

	@Transactional
	List<ProvidersPostModel> findByEmail(String id);
	@Modifying
	@Transactional	
	@Query(value="delete from providers_posts where email=:email and pic=:pic", nativeQuery = true)
	void deletePost(@Param("email")String email,@Param("pic")String pic);
}
