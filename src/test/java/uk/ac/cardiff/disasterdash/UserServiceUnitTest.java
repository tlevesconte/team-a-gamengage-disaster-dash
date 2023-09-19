package uk.ac.cardiff.disasterdash;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import uk.ac.cardiff.disasterdash.model.ApplicationUser;
import uk.ac.cardiff.disasterdash.model.Role;
import uk.ac.cardiff.disasterdash.repository.UserRepository;
import uk.ac.cardiff.disasterdash.service.UserService;

@ExtendWith(MockitoExtension.class)
class UserServiceUnitTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private AutoCloseable autoCloseable;
    private UserService userServiceTest;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        userServiceTest = new UserService(userRepository, bCryptPasswordEncoder);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void throwLoadUserByUsernameExceptionTest() {
        String username = "test";
        assertThatThrownBy(() -> userServiceTest.loadUserByUsername(username))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessageContaining("User with username " + username + " not found.");
    }

    @Test
    void registerUserTest() {
        ApplicationUser user = new ApplicationUser(
                "test_user",
                "password",
                Role.ADMIN
        );
        userServiceTest.registerUser(user);

        ArgumentCaptor<ApplicationUser> userArgumentCaptor =
                ArgumentCaptor.forClass(ApplicationUser.class);

        verify(userRepository)
                .save(userArgumentCaptor.capture());
        ApplicationUser capturedUser = userArgumentCaptor.getValue();

        assertThat(capturedUser).isEqualTo(user);
    }
}