package uk.ac.cardiff.disasterdash.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import uk.ac.cardiff.disasterdash.DTO.AdminQuizDTO;
import uk.ac.cardiff.disasterdash.DTO.QuizDTO;
import uk.ac.cardiff.disasterdash.repository.QuizRepository;

import java.util.Arrays;
import java.util.Optional;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.data.jpa.domain.AbstractPersistable_.id;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;


@RunWith(SpringRunner.class)
@WebMvcTest(QuizController.class)

public class CrudControllerTests {
    @MockBean
    private QuizRepository quizRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @WithMockUser(roles = "ADMIN")

    @Test
    void shouldAddQuestion() throws Exception {
        QuizDTO quizDTO = new QuizDTO(104, "epidemics", 99, 4, "Test Question?", "A", "B", "C", "D", "hint");
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(quizDTO);
        mockMvc.perform(post("/adminadd").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void shouldGetQuestionByID() throws Exception {
        int id = 25;
        AdminQuizDTO quizDTO = new AdminQuizDTO(id, "epidemics", 4, 4, "TestQuestion", "B", "C", "C", "D", "D", "hint");

        when(quizRepository.getById(id)).thenReturn(Arrays.asList(quizDTO));
        mockMvc.perform(get("/admingetbyid/25", id)
                .with(user("admin").password("password").roles("USER")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(id))
                .andExpect(jsonPath("$[0].type").value(quizDTO.getType()))
                .andExpect(jsonPath("$[0].questionIndex").value(quizDTO.getQuestionIndex()))
                .andExpect(jsonPath("$[0].choiceA").value(quizDTO.getChoiceA()))
                .andDo(print());
    }


    @Test
    void shouldDeleteQuestion() throws Exception {
        int id = 107;
        QuizDTO quizDTO = new QuizDTO(id, "epidemics", 30, 4, "Test Question?", "A", "B", "C", "D", "hint");

        when(quizRepository.deleteQuestion(id)).thenReturn("Deleted question with id:" + id);
        mockMvc.perform(delete("/admindelete/107", id).with(csrf())
                .with(user("admin").password("password").roles("ADMIN")))
                .andExpect(status().isOk())
                .andDo(print());
    }
    @Test
    void shouldUpdateQuestion() throws Exception {
        int id = 120;

        AdminQuizDTO quizDTO = new AdminQuizDTO(id, "epidemics", 30, 4, "TestQuestion", "B", "C", "C", "D", "D", "hint");
        QuizDTO updatedquizDTO = new QuizDTO(id, "epidemics", 30, 4, "Updated Test Question?", "A", "B", "C", "D", "hint");

        when(quizRepository.getById(id)).thenReturn(Arrays.asList(quizDTO));
        when(quizRepository.updateQuestion(any(QuizDTO.class))).thenReturn(updatedquizDTO);
//        admin login details required here in order to update values
        mockMvc.perform(put("/adminupdate").with(csrf()).with(user("admin").password("password").roles("ADMIN")).contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedquizDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.type").value(updatedquizDTO.getType()))
                .andExpect(jsonPath("$.questionIndex").value(updatedquizDTO.getquestionIndex()))
                .andExpect(jsonPath("$.choiceA").value(updatedquizDTO.getChoiceA()))
                .andDo(print());
    }


}
