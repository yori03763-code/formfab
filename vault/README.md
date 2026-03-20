# FormFab Agent Team

This vault is the **source of truth** for the FormFab project. All agents read from and write to this vault.

---

## 🤖 Agent Team

| Agent | Role | Input | Output |
|-------|------|-------|--------|
| **Business Analyst** | Market research, competitor analysis, pricing strategy | `research/` | `agents/business-analyst.md` |
| **Product Owner** | Feature prioritization, user stories, roadmap | Business + User feedback | `agents/product-owner.md` |
| **Tech Lead** | Architecture, tech stack, technical decisions | Product requirements | `agents/tech-lead.md` |
| **Designer** | UX/UI, user flows, visual design | Feature specs | `agents/designer.md` |
| **Developer** | Implementation, code, tests | Design + Tech specs | `agents/developer.md` |
| **QA Engineer** | Testing, edge cases, quality assurance | Implementation | `agents/qa-engineer.md` |

---

## 📁 Vault Structure

```
vault/
├── agents/           # Agent outputs and status
│   ├── business-analyst.md
│   ├── product-owner.md
│   ├── tech-lead.md
│   ├── designer.md
│   ├── developer.md
│   └── qa-engineer.md
├── projects/         # Project definitions
│   └── formfab.md
├── research/         # Raw research notes
├── decisions/        # Architecture Decision Records (ADRs)
└── daily/            # Daily agent reports
```

---

## 🔄 Agent Workflow

```
[Business Analyst]
    ↓ Market data, competitors, pricing
[Product Owner]
    ↓ Features, priorities, roadmap
[Tech Lead]
    ↓ Architecture, tech stack, ADRs
[Designer]
    ↓ UX flows, UI specs
[Developer]
    ↓ Implementation, code
[QA Engineer]
    ↓ Tests, edge cases
[DEPLOYED PRODUCT]
```

---

## 📝 How Agents Communicate

1. **Each agent has a file** in `vault/agents/`
2. **Agents read** previous agent's output
3. **Agents write** their findings/decisions
4. **Daily sync** in `vault/daily/YYYY-MM-DD.md`

---

## 🚀 Spawning Agents

Each agent can be spawned via `sessions_spawn` with specific context from the vault.

---

*Last updated: 2026-03-20*