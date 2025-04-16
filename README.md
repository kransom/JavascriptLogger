# JavascriptLogger - Short Description
This wrapper logger helps manage log output by setting log levels (e.g., debug, info, warning, error). You can dynamically adjust these levels during runtime using helper functions.


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
```

---

## 📊 Log Level Reference

|Level | Description |
| ------------- | ------------- |
|DEBUG | Verbose debugging info |
|INFO | General info logs |
|WARN | Warnings |
|ERROR | Errors/failures |
|OFF | Disable logging |

---

## 🧪 Trace Mode

Add { trace: true } anywhere in the arguments to:

Group the log and Print a full stack trace

```js
logger.warn("This is a warning", { trace: true }, { details: "extra info" });
```

Example Output
```pgsql
▼ [WARN] /src/index.js:12:5
  Cache miss on key: user:123
  console.trace
    at Logger.log (logger.js:75:18)
    at Logger.warn (logger.js:31:10)
    at Object.<anonymous> (index.js:12:5)
```

---

## 🧩 File & Line Reporting

Each log line shows the file and line number where the log was called:
```bash
[INFO]  User logged in  /src/index.js:27:10
```

---

## 📁 License
MIT – Feel free to use and modify.
```yaml
Let me know if you'd like this turned into a downloadable file or integrated into your project structure.
```
