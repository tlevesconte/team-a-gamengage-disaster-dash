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
public class MenuMVCTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void startMenuPageTest() throws Exception {
        this.mockMvc.perform(get("/"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("start-menu")));
    }

    @Test
    public void optionMenuPageTest() throws Exception {
        this.mockMvc.perform(get("/option"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("option-interface")));
    }

    @Test
    public void tutorialPageTest() throws Exception {
        this.mockMvc.perform(get("/tutorial"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("tutorial-interface")));
    }
}
