package com.insurai.controller;

import com.insurai.dto.ApiResponse;
import com.insurai.model.Agent;
import com.insurai.service.AgentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agents")
@RequiredArgsConstructor
public class AgentController {

    private final AgentService agentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Agent>>> getAgents() {
        List<Agent> agents = agentService.getAvailableAgents();
        return ResponseEntity.ok(ApiResponse.success("Available agents retrieved", agents));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Agent>> getAgentById(@PathVariable Long id) {
        Agent agent = agentService.getAgentById(id);
        return ResponseEntity.ok(ApiResponse.success("Agent details retrieved", agent));
    }
}
