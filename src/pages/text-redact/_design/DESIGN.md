# 敏感信息掩蔽工具 (Text Redaction Tool) - UI/UX Design

## Overview

A text redaction tool for non-technical users to mask sensitive information in text before sharing. The tool runs entirely in the browser with no server uploads.

## Target User

- Non-programmers
- Users who need to share text but want to hide specific information (names, phone numbers, IDs, etc.)
- No knowledge of regex or pattern matching required

## User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Paste Text                                                   │
│    User pastes or types original text                          │
├─────────────────────────────────────────────────────────────────┤
│ 2. Configure Masking                                           │
│    - Toggle pre-defined patterns (numbers, etc.)               │
│    - Add custom words/phrases to mask                          │
├─────────────────────────────────────────────────────────────────┤
│ 3. Preview & Adjust                                            │
│    Real-time preview shows redacted result                     │
├─────────────────────────────────────────────────────────────────┤
│ 4. Copy Result                                                  │
│    One-click copy of redacted text                             │
└─────────────────────────────────────────────────────────────────┘
```

## UI Components

### 1. Page Header

```
敏感信息掩蔽
在浏览器内对文本进行脱敏处理，文件不会上传到任何服务器。
```

### 2. Input Section: Original Text

A large textarea for pasting the original text.

**Component:**
- Label: "原文"
- Placeholder: "在此粘贴需要脱敏的文本..."
- Minimum height: 150px
- Clear button (×) appears when text is present

### 3. Masking Configuration Panel

A clearly labeled section with two sub-sections:

#### 3.1 Quick Patterns (Checkboxes)

Simple toggles for common patterns. No regex knowledge required.

| Pattern | Label | Description | Default |
|---------|-------|-------------|---------|
| Numbers | 掩蔽数字 | 掩蔽所有数字（支持千分位格式如1,234,567） | Off |

**Rationale:** Start with just one pre-defined pattern (numbers). More patterns can be added later based on user feedback.

**UI:**
```
┌─────────────────────────────────────────────────────────────────┐
│ 快捷选项                                                        │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ☐ 掩蔽数字                                                  │ │
│ │   例：1,234,567 → ***                                       │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### 3.2 Custom Words/Phrases

A simple input for adding words or phrases to mask.

**UI:**
```
┌─────────────────────────────────────────────────────────────────┐
│ 自定义掩蔽词                                                    │
│                                                                 │
│ ┌───────────────────────────────────────────┐ ┌───────┐        │
│ │ 输入要掩蔽的词语...                        │ │ 添加 │        │
│ └───────────────────────────────────────────┘ └───────┘        │
│                                                                 │
│ ┌────────┐  ┌────────┐  ┌────────┐                             │
│ │ 张三 × │  │ 李四 × │  │ ABC公司 ×│                            │
│ └────────┘  └────────┘  └────────┘                             │
└─────────────────────────────────────────────────────────────────┘
```

**Interaction:**
- Input field for entering custom words
- "添加" button or Enter key adds the word as a chip/tag
- Each chip has an × button to remove
- Duplicate words are prevented (show brief warning)
- Case-sensitive matching by default

### 4. Output Section: Redacted Text

A read-only textarea showing the result.

**Component:**
- Label: "处理结果"
- Read-only textarea showing masked text
- Copy button prominently displayed

**Visual differentiation:**
- Slightly different background color (using `--border` as background)
- Border style that indicates read-only state

### 5. Action Buttons

Primary action: Copy result

```
┌─────────────────────────┐
│ 📋 复制处理结果          │
└─────────────────────────┘
```

**States:**
- Default: "📋 复制处理结果"
- Success (1.5s): "✓ 已复制"
- No content: Button disabled

## Layout Structure

Mobile-first, single-column layout following the existing PDF tool pattern.

```
┌─────────────────────────────────────────────────────────────────┐
│ 敏感信息掩蔽                                                    │
│ 在浏览器内对文本进行脱敏处理，文件不会上传到任何服务器。           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 原文                                                        │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │                                                         │ │ │
│ │ │ 在此粘贴需要脱敏的文本...                                 │ │ │
│ │ │                                                         │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 掩蔽设置                                                    │ │
│ │                                                             │ │
│ │ 快捷选项                                                    │ │
│ │ ☐ 掩蔽数字（支持千分位格式）                                 │ │
│ │                                                             │ │
│ │ 自定义掩蔽词                                                │ │
│ │ ┌───────────────────────────────────┐ ┌──────┐             │ │
│ │ │                                   │ │ 添加 │             │ │
│ │ └───────────────────────────────────┘ └──────┘             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 处理结果                                                    │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │                                                         │ │ │
│ │ │ （处理后的文本将显示在这里）                              │ │ │
│ │ │                                                         │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │                                                             │ │
│ │ ┌─────────────────────────┐                                │ │
│ │ │ 📋 复制处理结果          │                                │ │
│ │ └─────────────────────────┘                                │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Styling

Follow the existing design system:

### CSS Variables Used
- `--fg`: Primary text color
- `--fg-muted`: Secondary/hint text
- `--bg`: Background
- `--accent`: Primary action color (buttons, links)
- `--border`: Borders and dividers
- `--color-success`: Success states
- `--color-error`: Error states

### Component Styles

**Input/Output Textareas:**
```css
textarea {
  width: 100%;
  min-height: 150px;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.925rem;
  line-height: 1.6;
  resize: vertical;
}
```

**Output textarea (read-only):**
```css
textarea[readonly] {
  background-color: var(--border);
  cursor: default;
}
```

**Checkbox Labels:**
```css
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
}
.checkbox-hint {
  font-size: 0.875rem;
  color: var(--fg-muted);
}
```

**Tag Chips:**
```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: var(--border);
  border-radius: 4px;
  font-size: 0.875rem;
}
.tag-remove {
  cursor: pointer;
  opacity: 0.6;
}
.tag-remove:hover {
  opacity: 1;
}
```

**Primary Button:**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--accent);
  color: var(--bg);
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Interactions

### Real-time Processing
- As the user types or changes masking options, the output updates immediately
- No "Submit" or "Process" button needed
- Debounce input changes by 150ms to prevent excessive processing

### Masking Replacement
All masked content is replaced with `***` (three asterisks).

**Rationale:**
- Fixed replacement length prevents information leakage about original length
- Simple and recognizable as redacted content
- Consistent with common redaction practices

### Masking Order
1. First apply custom words/phrases (case-sensitive, exact match)
2. Then apply pattern-based masking (numbers if enabled)

This order ensures that if a custom word contains numbers, the entire word is masked as one unit before number pattern matching runs.

### Edge Cases

| Scenario | Behavior |
|----------|----------|
| Empty input text | Show disabled copy button, output shows placeholder |
| No masking configured | Output matches input exactly |
| Overlapping custom words | Longer matches take priority |
| Custom word not found | No change, word still shown in tag list |

## Accessibility

- All form controls have associated labels
- Status messages use `aria-live="polite"`
- Keyboard navigation supported throughout
- Focus states clearly visible
- Color contrast meets WCAG AA standards

## Technical Implementation Notes

### No Framework Needed
This tool can be implemented with pure Astro + vanilla JS:
- Simple state: input text, checkbox state, array of custom words
- DOM updates: direct manipulation of textarea value and tag list
- No complex state management needed

### Privacy
- All processing happens in the browser
- No data sent to server

### Persistence (v2)
Custom masking words are persisted to localStorage to survive page refreshes. This is a user-requested feature to prevent data loss when working with multiple sensitive terms.

**Storage:**
- Key: `text-redact-custom-words`
- Value: JSON array of strings
- Load on page init, save on every change

**Clear All:**
- A "清除全部" (Clear All) button appears when there are saved words
- Single click clears all words immediately (no confirmation needed for simplicity)

## Custom Words Input Enhancement (v2)

### Batch Import via Textarea

Replace the single-line input with a multi-line textarea to support batch import of masking words.

**UI:**
```
┌─────────────────────────────────────────────────────────────────┐
│ 自定义掩蔽词                                                    │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 输入要掩蔽的词语，每行一个...                                 │ │
│ │                                                             │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌──────┐  ┌──────────┐                                         │
│ │ 添加 │  │ 清除全部 │                                          │
│ └──────┘  └──────────┘                                         │
│                                                                 │
│ ┌────────┐  ┌────────┐  ┌────────┐                             │
│ │ 张三 × │  │ 李四 × │  │ ABC公司 ×│                            │
│ └────────┘  └────────┘  └────────┘                             │
└─────────────────────────────────────────────────────────────────┘
```

**Interaction:**
- Textarea allows multi-line input (one word per line)
- "添加" button processes all lines, adding each non-empty line as a word
- Duplicate words are silently skipped (no warning needed for batch operations)
- After adding, textarea is cleared
- Enter key in textarea creates a new line (does not trigger add)
- "清除全部" button removes all words and clears localStorage
- "清除全部" button is hidden when there are no words

**Edge Cases:**

| Scenario | Behavior |
|----------|----------|
| Empty lines in input | Skipped silently |
| Whitespace-only lines | Skipped silently |
| Duplicate words in batch | Added once, duplicates skipped |
| Mix of new and existing words | Only new words added |

## Large Text Manual Mode (v3)

### Background

Real-time processing (auto-update on every keystroke/change) works well for small to medium text but causes performance issues with large text. Users may experience:
- Browser UI lag/freezing during typing
- Delayed visual feedback
- High CPU usage

### Design Goals

1. **Transparent mode switching** — Users should understand why behavior changed
2. **Minimal disruption** — Keep the familiar workflow as much as possible
3. **User control** — Allow users to trigger updates when ready

### Threshold

**Recommended: 50KB (approximately 50,000 characters)**

Rationale:
- 50KB is large enough to avoid false triggers on typical documents
- Small enough to prevent noticeable lag on most devices
- Roughly equivalent to a 20-30 page document

The threshold is measured by `inputText.value.length` (character count, not byte size).

### Mode Detection

The system automatically detects text size and switches modes:

| Text Size | Mode | Behavior |
|-----------|------|----------|
| < 50KB | Auto (实时模式) | Real-time updates on every change |
| ≥ 50KB | Manual (手动模式) | Updates only when user clicks button |

**Important:** Mode is determined by input text size only, not by processing time or system performance. This provides predictable, consistent behavior.

### UI Changes for Manual Mode

When text exceeds the threshold, the following UI changes appear:

#### 1. Mode Banner (Notification)

A subtle banner appears above the output section to inform users of the mode change.

**Location:** Between "掩蔽设置" section and "处理结果" section

**UI:**
```
┌─────────────────────────────────────────────────────────────────┐
│ ℹ️ 文本较大，已切换为手动模式。修改后请点击"更新结果"。           │
└─────────────────────────────────────────────────────────────────┘
```

**Styling:**
- Background: Light blue tint (`rgba(37, 99, 235, 0.08)` in light mode)
- Border: 1px solid with accent color at 30% opacity
- Border-radius: 6px
- Padding: 0.625rem 0.75rem
- Font-size: 0.875rem
- Color: `var(--fg)`
- Icon: ℹ️ (info emoji, or a simple SVG icon)

**Behavior:**
- Appears immediately when text crosses the threshold
- Disappears when text goes back below threshold
- Does not dismiss automatically — stays visible as a reminder

#### 2. Update Button

A prominent button to trigger manual processing.

**Location:** Above the output textarea, inline with the "处理结果" label

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ 处理结果                                    ┌────────────────┐   │
│                                             │ 🔄 更新结果     │   │
│ ┌─────────────────────────────────────────┐ └────────────────┘   │
│ │                                         │                      │
│ │ （处理后的文本将显示在这里）              │                      │
│ │                                         │                      │
│ └─────────────────────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

**Button Styling:**
- Uses `.btn-secondary` style for visual distinction from the primary "复制" button
- Icon: 🔄 (or a simple refresh SVG icon)
- Text: "更新结果"

**States:**
| State | Appearance | When |
|-------|------------|------|
| Default | Normal secondary button | Updates are pending |
| Disabled | Grayed out, cursor: not-allowed | No input text |
| Processing | Show loading dots, button disabled | During processing |
| Up-to-date | Hidden or visually de-emphasized | Output matches current input/settings |

**Pending Indicator (Optional Enhancement):**
When changes are pending (input or settings changed since last update), the button could show a subtle visual indicator:
- Yellow/orange dot badge on the button
- Or change button text to "更新结果 •" with a dot

This is optional — the banner already informs users about manual mode.

#### 3. Output Section Layout

The output section header changes to accommodate the update button:

**Auto Mode (current):**
```
┌─────────────────────────────────────────────────────────────────┐
│ 处理结果                                                         │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ textarea                                                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────┐                                     │
│ │ 📋 复制处理结果          │                                     │
│ └─────────────────────────┘                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Manual Mode:**
```
┌─────────────────────────────────────────────────────────────────┐
│ ℹ️ 文本较大，已切换为手动模式。修改后请点击"更新结果"。           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 处理结果                                    ┌────────────────┐   │
│                                             │ 🔄 更新结果     │   │
│ ┌─────────────────────────────────────────┐ └────────────────┘   │
│ │ textarea                                                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────┐                                     │
│ │ 📋 复制处理结果          │                                     │
│ └─────────────────────────┘                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Interaction Flow

#### Entering Manual Mode

1. User pastes/types text that exceeds 50KB
2. System detects size threshold crossed
3. Banner appears with mode explanation
4. "更新结果" button appears
5. One automatic processing runs immediately (so user sees initial result)
6. Subsequent changes do NOT auto-update

#### Using Manual Mode

1. User makes changes (input text, checkbox, custom words)
2. Output remains unchanged (stale)
3. User clicks "更新结果" when ready
4. Button shows processing state (loading dots)
5. Output updates with new result
6. Button returns to default state

#### Exiting Manual Mode

1. User clears text or reduces it below threshold
2. Banner disappears
3. "更新结果" button disappears
4. Real-time processing resumes automatically

### Edge Cases

| Scenario | Behavior |
|----------|----------|
| Paste large text (> 50KB) | Process once immediately, then switch to manual mode |
| Type past threshold gradually | Switch to manual mode when threshold crossed; do NOT auto-process |
| Clear text with "×" button | Return to auto mode, clear output |
| Text exactly at threshold | Use auto mode (threshold is ≥, not >) |
| User clicks update rapidly | Debounce clicks, ignore during processing |

### Accessibility

- Banner uses `role="status"` and `aria-live="polite"` to announce mode change
- "更新结果" button is keyboard accessible
- Processing state announced via `aria-busy="true"`
- Clear focus management when mode changes

### CSS Additions

```css
/* Mode banner */
.mode-banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  margin-bottom: 1rem;
  background-color: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.3);
  border-radius: 6px;
  font-size: 0.875rem;
  color: var(--fg);
}
.mode-banner[hidden] {
  display: none;
}
@media (prefers-color-scheme: dark) {
  .mode-banner {
    background-color: rgba(96, 165, 250, 0.1);
    border-color: rgba(96, 165, 250, 0.3);
  }
}

/* Output header with update button */
.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.output-header .label {
  margin-bottom: 0;
}

/* Update button (uses .btn-secondary base) */
.btn-update {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
.btn-update[hidden] {
  display: none;
}
```

### Implementation Notes

#### State Management

Add to existing state:
```typescript
let isManualMode = false;
let hasPendingChanges = false;
```

#### Threshold Constant

```typescript
const LARGE_TEXT_THRESHOLD = 50_000; // characters
```

#### Mode Detection Logic

```typescript
function checkMode() {
  const shouldBeManual = inputText.value.length >= LARGE_TEXT_THRESHOLD;

  if (shouldBeManual !== isManualMode) {
    isManualMode = shouldBeManual;
    updateModeUI();

    if (shouldBeManual) {
      // Entering manual mode: process once immediately
      processText();
    }
  }
}
```

#### Modified Input Handler

```typescript
inputText.addEventListener('input', () => {
  updateClearButton();
  checkMode();

  if (isManualMode) {
    hasPendingChanges = true;
    // Do NOT call scheduleProcess()
  } else {
    scheduleProcess();
  }
});
```

### Design Decisions & Rationale

**Q: Why not let users choose mode manually?**
A: Adding a toggle increases UI complexity. Automatic detection based on text size provides a simpler experience while solving the performance problem. Advanced users can work around this by processing text in smaller chunks if needed.

**Q: Why show a banner instead of just the button?**
A: Users accustomed to real-time updates might be confused when output doesn't update. The banner explains why behavior changed, reducing frustration.

**Q: Why process once when entering manual mode?**
A: Users expect to see some output after pasting text. Running one initial process provides immediate feedback while preventing continuous lag from subsequent edits.

**Q: Why 50KB threshold?**
A: Testing showed noticeable lag at around 100KB on average devices. 50KB provides a safety margin. The threshold can be adjusted based on user feedback.

## Future Considerations (Out of Scope for v3+)

The following features could be added later based on user feedback:

1. **Additional Quick Patterns:**
   - Phone numbers (手机号)
   - ID card numbers (身份证号)
   - Email addresses (邮箱)
   - Bank card numbers (银行卡号)

2. **Customizable Replacement Text:**
   - Allow users to choose replacement (e.g., `***`, `[已删除]`, `█████`)

3. **Case-Insensitive Matching Option:**
   - Toggle for custom words

4. **Import/Export Word Lists:**
   - Save frequently used masking configurations

5. **Partial Number Masking:**
   - Keep first/last N digits visible (e.g., `138****1234`)

---

## References

- [Best Redaction Software Comparison](https://www.redactifyai.com/blog/best-redaction-software-comparison/)
- [Text Redaction Methods and Best Practices](https://www.redactable.com/blog/text-redaction)
- [The Complete Guide to Secure Document Redaction](https://apryse.com/secure-redaction-guide)
