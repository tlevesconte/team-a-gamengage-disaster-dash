package uk.ac.cardiff.disasterdash;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TeamADisasterDashApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeamADisasterDashApplication.class, args);
    }
}

