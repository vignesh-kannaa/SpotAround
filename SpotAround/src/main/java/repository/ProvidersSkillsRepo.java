package repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;


import model.ProvidersSkillsModel;

public interface ProvidersSkillsRepo extends JpaRepository<ProvidersSkillsModel,Integer> {

	List<ProvidersSkillsModel> findByEmail(String id);
	@Transactional
	void deleteByEmail(String id);
}
