package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.CategoryModel;


public interface CategoryRepo  extends JpaRepository<CategoryModel, Integer>{

	
	@Query(value="select distinct id,main_category,image_path_mc,null as image_path_sc,null as sub_category,null as flag_mark from category where image_path_mc is not null;", nativeQuery = true)
	List<CategoryModel> findCategories();
	
	@Query(value="select sub_category from category where main_category=:category", nativeQuery = true)
	List<String> findSubCategories(@Param("category")String category);
	
	@Query(value="select * from category where flag_mark='1' ", nativeQuery = true)
	List<CategoryModel> findFeaturedCategory();
	
}
