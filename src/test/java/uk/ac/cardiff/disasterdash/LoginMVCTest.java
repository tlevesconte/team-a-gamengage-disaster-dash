package uk.ac.cardiff.disasterdash;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;



@SpringBootTest
@AutoConfigureMockMvc
public class LoginMVCTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void loginPageTest() throws Exception {
        this.mockMvc.perform(get("/login"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("login-interface")));
    }
}
