package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.LocationModel;


public interface LocationRepo extends JpaRepository<LocationModel, Integer>{

	
	@Query(value="select distinct(state) from location", nativeQuery = true)
	List<String> findStates();
	
	@Query(value="select city from location where state=:state", nativeQuery = true)
	List<String> findCities(@Param("state")String state);
}
