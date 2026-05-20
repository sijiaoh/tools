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
- localStorage not required (stateless tool)

## Future Considerations (Out of Scope for v1)

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
