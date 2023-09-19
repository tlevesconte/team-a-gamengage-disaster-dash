package uk.ac.cardiff.disasterdash;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class SecurityMVCTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void unauthorisedAdminPageAccessTest() throws Exception {
        this.mockMvc.perform(get("/admin"))
                .andDo(print())
                .andExpect(status().is(401));

    }

    @Test
    public void unauthorisedQuestionOrderPageAccessTest() throws Exception {
        this.mockMvc.perform(get("/admin/questionOrder"))
                .andDo(print())
                .andExpect(status().is(401));

    }

    @Test
    public void authorisedAdminPageAccessTest() throws Exception {
        this.mockMvc.perform(get("/admin").with(user("test").password("test").roles("ADMIN")))
                .andDo(print())
                .andExpect(status().is(200));
    }

    @Test
    public void authorisedQuestionOrderPageAccessTest() throws Exception {
        this.mockMvc.perform(get("/admin/questionOrder").with(user("test").password("test").roles("ADMIN")))
                .andDo(print())
                .andExpect(status().is(200));
    }
}
