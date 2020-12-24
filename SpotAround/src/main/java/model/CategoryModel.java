package model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Category")
public class CategoryModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String mainCategory;
	private String imagePath_MC;
	private String subCategory;
	private String imagePath_SC;
	private String flagMark;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMainCategory() {
		return mainCategory;
	}
	public void setMainCategory(String mainCategory) {
		this.mainCategory = mainCategory;
	}
	public String getImagePath_MC() {
		return imagePath_MC;
	}
	public void setImagePath_MC(String imagePath_MC) {
		this.imagePath_MC = imagePath_MC;
	}
	public String getSubCategory() {
		return subCategory;
	}
	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}
	public String getImagePath_SC() {
		return imagePath_SC;
	}
	public void setImagePath_SC(String imagePath_SC) {
		this.imagePath_SC = imagePath_SC;
	}
	
	public String getFlagMark() {
		return flagMark;
	}
	public void setFlagMark(String flagMark) {
		this.flagMark = flagMark;
	}
	@Override
	public String toString() {
		return "CategoryModel [id=" + id + ", mainCategory=" + mainCategory + ", imagePath_MC=" + imagePath_MC
				+ ", subCategory=" + subCategory + ", imagePath_SC=" + imagePath_SC + ", flagMark=" + flagMark + "]";
	}
	


}
