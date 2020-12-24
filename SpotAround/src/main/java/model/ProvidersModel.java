package model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name="Providers")
public class ProvidersModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String email;
	private String firstName;
	private String lastName;
	@Lob
	private String imagePath;
	private Float ratings;
	private Integer hiredTimes;
	private String category;
	private String subCategory;
	private String state;
	private String city;
	private String description;
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
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public Float getRatings() {
		return ratings;
	}
	public void setRatings(Float ratings) {
		this.ratings = ratings;
	}
	public Integer getHiredTimes() {
		return hiredTimes;
	}
	public void setHiredTimes(Integer hiredTimes) {
		this.hiredTimes = hiredTimes;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getSubCategory() {
		return subCategory;
	}
	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "ProvidersModel [id=" + id + ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", imagePath=" + imagePath + ", ratings=" + ratings + ", hiredTimes=" + hiredTimes + ", category="
				+ category + ", subCategory=" + subCategory + ", state=" + state + ", city=" + city + ", description="
				+ description + "]";
	}
	
	
	}
