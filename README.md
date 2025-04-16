# JavascriptLogger - Short Description
Wrapper Logger on the browser's console.log method. Helps setup log level. You can adjust the level in real-time with helper functions.


# 🪵 JavascriptLogger - (Custom JavaScript Logger) - Long Description

A lightweight, flexible logger for JavaScript that supports:

- Multiple log levels (DEBUG, INFO, WARN, ERROR, OFF)
- Smart handling of messages (primitives vs objects)
- Optional stack tracing
- File and line number reporting for log calls
- Grouped output for cleaner debugging

---

## 🚀 Features

- 🔢 Log levels: `DEBUG`, `INFO`, `WARN`, `ERROR`, `OFF`
- 🧠 Intelligently formats:
  - Strings, numbers, and booleans inline
  - Objects in a grouped block
- 🧭 Caller location tracking (shows file & line number)
- 🪜 Optional stack trace output using `{ trace: true }`

---

## 📦 Installation

No installation needed — just copy the `Logger` class into your project. 

OR 

Include it as a JS file
<script type="application/javascript" src="logger.js') }}"></script>

---

## 📄 Usage

```js
const logger = new Logger(LogLevel.DEBUG); // Set initial level

logger.debug("Debugging value:", 123);
logger.info("User logged in", { userId: 42 });
logger.warn("Cache miss", { trace: true });
logger.error({ error: "Something went wrong" }, { trace: true });

logger.setLevel(LogLevel.WARN); // Only WARN and ERROR will log now
logger.debug("This won't show");

logger.setTrace(true); // Force a group stack trace
logger.warn("Show message and stack trace");
