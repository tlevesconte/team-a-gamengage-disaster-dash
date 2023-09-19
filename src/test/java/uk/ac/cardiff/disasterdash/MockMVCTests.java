package uk.ac.cardiff.disasterdash;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class MockMVCTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testStormsPage() throws Exception{
        this.mockMvc.perform(get("/storms")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("Storms")));
    }

    @Test
    public void testDroughtPage() throws Exception{
        this.mockMvc.perform(get("/drought")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("Drought")));
    }

    @Test
    public void testEpidemicsPage() throws Exception{
        this.mockMvc.perform(get("/epidemics")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("Epidemics")));
    }

    @Test
    public void testHeatwavePage() throws Exception{
        this.mockMvc.perform(get("/heatwave")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("Heatwave")));
    }

    @Test
    public void testSoilErosionPage() throws Exception{
        this.mockMvc.perform(get("/soilErosion")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("Soil erosion")));
    }
}
