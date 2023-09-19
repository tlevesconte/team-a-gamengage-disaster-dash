package uk.ac.cardiff.disasterdash.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import uk.ac.cardiff.disasterdash.service.UserService;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfiguration {
    private final CustomAuthenticationSuccessHandler authenticationSuccessHandler;

    @Bean
    public CustomAuthenticationSuccessHandler customAuthenticationSuccessHandlerBean() throws Exception {
        return new CustomAuthenticationSuccessHandler();
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests(auth -> {
                    auth.antMatchers("/static/css/**").permitAll();
                    auth.antMatchers("/admin").authenticated();
                    auth.antMatchers("/admin/questionOrder").authenticated();
                })
                .httpBasic(Customizer.withDefaults())
                .formLogin(login -> {
                    login.loginPage("/login").permitAll();
                    login.successHandler(authenticationSuccessHandler);
                })
                .build();
    }
}
