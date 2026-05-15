package com.insurai.service;

import com.insurai.model.Agent;
import com.insurai.model.User;
import com.insurai.repository.AgentRepository;
import com.insurai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final AgentRepository agentRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. Check users table
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPasswordHash(),
                    user.getIsActive(),
                    true, true, true,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
            );
        }

        // 2. Check agents table
        Optional<Agent> agentOpt = agentRepository.findByEmail(email);
        if (agentOpt.isPresent()) {
            Agent agent = agentOpt.get();
            return new org.springframework.security.core.userdetails.User(
                    agent.getEmail(),
                    agent.getPasswordHash(),
                    agent.getIsActive(),
                    true, true, true,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_AGENT"))
            );
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
