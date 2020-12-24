package com.project.spotaround;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"model"})
@ComponentScan("controller")
@EnableJpaRepositories("repository")
public class SpotAroundApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpotAroundApplication.class, args);
	}

}
