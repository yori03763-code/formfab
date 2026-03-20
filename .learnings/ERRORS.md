# FormFab Errors Log

## [ERR-20260320-001] vitest-config-not-found

**Logged**: 2026-03-20T18:12:00Z
**Priority**: medium
**Status**: resolved
**Area**: tests

### Summary
vitest/config module not found during test run

### Error
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'vitest' imported from vitest.config.ts
```

### Context
- Command: `npx vitest run`
- vitest installed as dev dependency
- Config file references vitest/config

### Suggested Fix
Install vitest properly or use inline config

### Resolution
- **Resolved**: 2026-03-20T18:14:00Z
- **Notes**: Tests run with inline config, vitest working

### Metadata
- Reproducible: yes
- Pattern-Key: tests.vitest-setup

---

## [ERR-20260320-002] cloudflared-sigterm

**Logged**: 2026-03-20T18:15:00Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
cloudflared tunnels get SIGTERM and restart frequently

### Error
```
Command aborted by signal SIGTERM
```

### Context
- Running cloudflared in background
- Tunnels terminate after ~5-10 minutes
- Requires manual restart

### Suggested Fix
Use nohup or systemd service for cloudflared

### Metadata
- Reproducible: yes
- Pattern-Key: infra.cloudflared-stability
- Recurrence-Count: 10

---
