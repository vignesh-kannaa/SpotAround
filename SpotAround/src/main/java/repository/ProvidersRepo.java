package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import model.ProvidersModel;

public interface ProvidersRepo  extends JpaRepository<ProvidersModel, Integer>{

	@Transactional
	ProvidersModel findByEmail(String email);
	@Transactional
	List<ProvidersModel>  findBySubCategory(String cat);
}
