package model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name="Users")
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String email;
	private String firstName;
	private String lastName;
	@Lob
	private String profilePath;
	private String businessFlag;
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
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getProfilePath() {
		return profilePath;
	}
	public void setProfilePath(String profilePath) {
		this.profilePath = profilePath;
	}
	public String isBusinessFlag() {
		return businessFlag;
	}
	public void setBusinessFlag(String businessFlag) {
		this.businessFlag = businessFlag;
	}
	@Override
	public String toString() {
		return "Users [id=" + id + ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", profilePath=" + profilePath + ", businessFlag=" + businessFlag + "]";
	}
	
	
	
}
