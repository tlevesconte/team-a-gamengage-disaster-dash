package uk.ac.cardiff.disasterdash;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;

/*import static org.hamcrest.MatcherAssert.assertThat;*/

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CheckBrowserResponse{
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void shouldPassIfStringMatches() throws Exception {
        assertThat(restTemplate.getForObject("http://localhost:" + port + "/",
                String.class)).contains("DisasterDash");
    }
}

