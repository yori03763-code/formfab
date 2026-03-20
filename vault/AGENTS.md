# 🤖 Agent Team System

## Overview

FormFab uses a **multi-agent system** where specialized agents collaborate. Each agent:
- Has a specific domain of expertise
- Reads from the Obsidian vault
- Writes their findings back
- Passes work to the next agent

---

## Agent Roster

### 1. Business Analyst 📊
**Role:** Market research, competitive analysis, pricing strategy

**Reads:**
- User feedback
- Market trends
- Competitor products

**Writes:**
- Market analysis reports
- Competitive landscape
- Pricing recommendations
- Business opportunity assessments

**Output File:** `vault/agents/business-analyst.md`

---

### 2. Product Owner 📋
**Role:** Feature prioritization, user stories, roadmap management

**Reads:**
- Business analyst reports
- User feedback
- Technical constraints

**Writes:**
- Feature backlog
- User stories
- Priority matrix
- Sprint planning

**Output File:** `vault/agents/product-owner.md`

---

### 3. Tech Lead 🏗️
**Role:** Architecture, tech stack decisions, technical debt

**Reads:**
- Product requirements
- Existing codebase
- Infrastructure constraints

**Writes:**
- Architecture decisions (ADRs)
- Tech stack recommendations
- Infrastructure plans
- Technical debt items

**Output File:** `vault/agents/tech-lead.md`

---

### 4. Designer 🎨
**Role:** UX flows, UI design, user experience

**Reads:**
- Feature specifications
- User stories
- Brand guidelines

**Writes:**
- User flow diagrams
- UI specifications
- Design tokens
- Component library specs

**Output File:** `vault/agents/designer.md`

---

### 5. Developer 👨‍💻
**Role:** Implementation, coding, integrations

**Reads:**
- Design specs
- Tech architecture
- QA feedback

**Writes:**
- Code implementation
- API documentation
- Integration guides
- Deployment scripts

**Output File:** `vault/agents/developer.md`

---

### 6. QA Engineer 🧪
**Role:** Testing, edge cases, quality assurance

**Reads:**
- Implementation
- User stories
- Design specs

**Writes:**
- Test plans
- Edge case documentation
- Bug reports
- Quality metrics

**Output File:** `vault/agents/qa-engineer.md`

---

## Workflow

```
Business Analyst → Product Owner → Tech Lead → Designer → Developer → QA Engineer
```

Each agent reads the previous agent's output and adds their expertise.

---

## Daily Sync

Every day, agents report in `vault/daily/YYYY-MM-DD.md`:
- What was accomplished
- Blockers
- Next steps
- Handoffs

---

## Spawning Agents

```javascript
// Spawn agent with vault context
sessions_spawn({
  runtime: 'subagent',
  task: `Act as Business Analyst. Read vault/research/ and update vault/agents/business-analyst.md`
});
```

---

*This enables continuous autonomous development with specialized expertise.*