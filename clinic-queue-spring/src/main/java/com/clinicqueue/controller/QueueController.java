package com.clinicqueue.controller;

import com.clinicqueue.model.Patient;
import com.clinicqueue.service.QueueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class QueueController {

    private final QueueService queueService;

    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    @PostMapping("/addPatient")
    public ResponseEntity<Map<String, Object>> addPatient(@RequestBody Map<String, String> body) {
        String name = body != null && body.containsKey("name") ? body.get("name").trim() : "";
        if (name.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name is required"));
        }
        Patient patient = queueService.addPatient(name);
        return ResponseEntity.ok(Map.of(
                "tokenNumber", patient.getTokenNumber(),
                "name", patient.getName(),
                "message", "Your Token Number is " + patient.getTokenNumber()
        ));
    }

    @GetMapping("/queue")
    public ResponseEntity<Map<String, Object>> getQueue() {
        Patient nowServing = queueService.getNowServing();
        return ResponseEntity.ok(Map.of(
                "nowServing", nowServing != null ? Map.of("tokenNumber", nowServing.getTokenNumber(), "name", nowServing.getName()) : null,
                "waitingCount", queueService.getWaitingCount(),
                "queue", queueService.getFullQueue()
        ));
    }

    @PostMapping("/next")
    public ResponseEntity<Map<String, Object>> callNext() {
        Patient next = queueService.callNext();
        Map<String, Object> result = new HashMap<>();
        result.put("nowServing", next != null ? Map.of("tokenNumber", next.getTokenNumber(), "name", next.getName()) : null);
        result.put("waitingCount", queueService.getWaitingCount());
        return ResponseEntity.ok(result);
    }
}
