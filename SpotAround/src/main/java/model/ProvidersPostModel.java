package model;



import javax.persistence.*;

@Entity
@Table(name="providers_posts")
public class ProvidersPostModel {

		@Id
	    @GeneratedValue
	    private int id;
	    private String email;
	    @Lob
	    private String pic;
	   
	    
	    
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
	
		
		public String getPic() {
			return pic;
		}
		public void setPic(String pic) {
			this.pic = pic;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		@Override
		public String toString() {
			return "ProvidersPostModel [id=" + id + ", email=" + email + ", pic=" + pic+ "]";
		}
		
		


			    
	
}
