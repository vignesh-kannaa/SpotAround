package model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="providers_skills")
public class ProvidersSkillsModel {

		@Id
	    @GeneratedValue
	    private int id;
	    private String email;
	    private String skills;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getSkills() {
			return skills;
		}
		public void setSkills(String skills) {
			this.skills = skills;
		}
		@Override
		public String toString() {
			return "ProvidersSkillsModel [id=" + id + ", email=" + email + ", skills=" + skills + "]";
		}
	   
		   
}
