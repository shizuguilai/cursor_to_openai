import { z } from "zod";
export declare const AssistantMessageSchema: z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>;
export declare const ThinkingMessageSchema: z.ZodObject<{
    text: z.ZodString;
    thinkingDurationMs: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    text: string;
    thinkingDurationMs?: number | undefined;
}, {
    text: string;
    thinkingDurationMs?: number | undefined;
}>;
export declare const UserMessageSchema: z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>;
export declare const ShellCommandSchema: z.ZodObject<{
    command: z.ZodString;
    workingDirectory: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    command: string;
    workingDirectory?: string | undefined;
}, {
    command: string;
    workingDirectory?: string | undefined;
}>;
export declare const ShellOutputSchema: z.ZodObject<{
    stdout: z.ZodString;
    stderr: z.ZodString;
    exitCode: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    stdout: string;
    stderr: string;
    exitCode: number;
}, {
    stdout: string;
    stderr: string;
    exitCode: number;
}>;
export declare const ConversationStepSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"assistantMessage">;
    message: z.ZodObject<{
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
    }, {
        text: string;
    }>;
}, "strip", z.ZodTypeAny, {
    message: {
        text: string;
    };
    type: "assistantMessage";
}, {
    message: {
        text: string;
    };
    type: "assistantMessage";
}>, z.ZodObject<{
    type: z.ZodLiteral<"toolCall">;
    message: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"shell">;
        args: z.ZodObject<{
            command: z.ZodString;
            workingDirectory: z.ZodOptional<z.ZodString>;
            timeout: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            command: string;
            timeout?: number | undefined;
            workingDirectory?: string | undefined;
        }, {
            command: string;
            timeout?: number | undefined;
            workingDirectory?: string | undefined;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                exitCode: z.ZodNumber;
                signal: z.ZodString;
                stdout: z.ZodString;
                stderr: z.ZodString;
                executionTime: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                signal: string;
                stdout: string;
                stderr: string;
                exitCode: number;
                executionTime: number;
            }, {
                signal: string;
                stdout: string;
                stderr: string;
                exitCode: number;
                executionTime: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                signal: string;
                stdout: string;
                stderr: string;
                exitCode: number;
                executionTime: number;
            };
            status: "success";
        }, {
            value: {
                signal: string;
                stdout: string;
                stderr: string;
                exitCode: number;
                executionTime: number;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "shell";
        args: {
            command: string;
            timeout?: number | undefined;
            workingDirectory?: string | undefined;
        };
        result?: {
            value: {
                signal: string;
                stdout: string;
                stderr: string;
                exitCode: number;
                executionTime: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "shell";
        args: {
            command: string;
            timeout?: number | undefined;
            workingDirectory?: string | undefined;
        };
        result?: {
            value: {
                signal: string;
                stdout: string;
                stderr: string;
                exitCode: number;
                executionTime: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"write">;
        args: z.ZodObject<{
            path: z.ZodString;
            fileText: z.ZodString;
            returnFileContentAfterWrite: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            path: string;
            fileText: string;
            returnFileContentAfterWrite?: boolean | undefined;
        }, {
            path: string;
            fileText: string;
            returnFileContentAfterWrite?: boolean | undefined;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                path: z.ZodString;
                linesCreated: z.ZodNumber;
                fileSize: z.ZodNumber;
                fileContentAfterWrite: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                fileSize: number;
                linesCreated: number;
                fileContentAfterWrite?: string | undefined;
            }, {
                path: string;
                fileSize: number;
                linesCreated: number;
                fileContentAfterWrite?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                path: string;
                fileSize: number;
                linesCreated: number;
                fileContentAfterWrite?: string | undefined;
            };
            status: "success";
        }, {
            value: {
                path: string;
                fileSize: number;
                linesCreated: number;
                fileContentAfterWrite?: string | undefined;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "write";
        args: {
            path: string;
            fileText: string;
            returnFileContentAfterWrite?: boolean | undefined;
        };
        result?: {
            value: {
                path: string;
                fileSize: number;
                linesCreated: number;
                fileContentAfterWrite?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "write";
        args: {
            path: string;
            fileText: string;
            returnFileContentAfterWrite?: boolean | undefined;
        };
        result?: {
            value: {
                path: string;
                fileSize: number;
                linesCreated: number;
                fileContentAfterWrite?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"delete">;
        args: z.ZodObject<{
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                fileSize: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                fileSize: number;
            }, {
                fileSize: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                fileSize: number;
            };
            status: "success";
        }, {
            value: {
                fileSize: number;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "delete";
        args: {
            path: string;
        };
        result?: {
            value: {
                fileSize: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "delete";
        args: {
            path: string;
        };
        result?: {
            value: {
                fileSize: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"glob">;
        args: z.ZodObject<{
            targetDirectory: z.ZodOptional<z.ZodString>;
            globPattern: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            globPattern: string;
            targetDirectory?: string | undefined;
        }, {
            globPattern: string;
            targetDirectory?: string | undefined;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                files: z.ZodArray<z.ZodString, "many">;
                totalFiles: z.ZodNumber;
                clientTruncated: z.ZodBoolean;
                ripgrepTruncated: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                files: string[];
                totalFiles: number;
                clientTruncated: boolean;
                ripgrepTruncated: boolean;
            }, {
                files: string[];
                totalFiles: number;
                clientTruncated: boolean;
                ripgrepTruncated: boolean;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                files: string[];
                totalFiles: number;
                clientTruncated: boolean;
                ripgrepTruncated: boolean;
            };
            status: "success";
        }, {
            value: {
                files: string[];
                totalFiles: number;
                clientTruncated: boolean;
                ripgrepTruncated: boolean;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "glob";
        args: {
            globPattern: string;
            targetDirectory?: string | undefined;
        };
        result?: {
            value: {
                files: string[];
                totalFiles: number;
                clientTruncated: boolean;
                ripgrepTruncated: boolean;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "glob";
        args: {
            globPattern: string;
            targetDirectory?: string | undefined;
        };
        result?: {
            value: {
                files: string[];
                totalFiles: number;
                clientTruncated: boolean;
                ripgrepTruncated: boolean;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"grep">;
        args: z.ZodObject<{
            pattern: z.ZodString;
            path: z.ZodOptional<z.ZodString>;
            glob: z.ZodOptional<z.ZodString>;
            outputMode: z.ZodOptional<z.ZodString>;
            contextBefore: z.ZodOptional<z.ZodNumber>;
            contextAfter: z.ZodOptional<z.ZodNumber>;
            context: z.ZodOptional<z.ZodNumber>;
            caseInsensitive: z.ZodOptional<z.ZodBoolean>;
            type: z.ZodOptional<z.ZodString>;
            headLimit: z.ZodOptional<z.ZodNumber>;
            offset: z.ZodOptional<z.ZodNumber>;
            multiline: z.ZodOptional<z.ZodBoolean>;
            sort: z.ZodOptional<z.ZodString>;
            sortAscending: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            pattern: string;
            sort?: string | undefined;
            context?: number | undefined;
            path?: string | undefined;
            type?: string | undefined;
            glob?: string | undefined;
            outputMode?: string | undefined;
            contextBefore?: number | undefined;
            contextAfter?: number | undefined;
            caseInsensitive?: boolean | undefined;
            headLimit?: number | undefined;
            multiline?: boolean | undefined;
            sortAscending?: boolean | undefined;
            offset?: number | undefined;
        }, {
            pattern: string;
            sort?: string | undefined;
            context?: number | undefined;
            path?: string | undefined;
            type?: string | undefined;
            glob?: string | undefined;
            outputMode?: string | undefined;
            contextBefore?: number | undefined;
            contextAfter?: number | undefined;
            caseInsensitive?: boolean | undefined;
            headLimit?: number | undefined;
            multiline?: boolean | undefined;
            sortAscending?: boolean | undefined;
            offset?: number | undefined;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                workspaceResults: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                    type: z.ZodLiteral<"content">;
                    output: z.ZodObject<{
                        matches: z.ZodArray<z.ZodObject<{
                            file: z.ZodString;
                            lineNumber: z.ZodOptional<z.ZodNumber>;
                            line: z.ZodString;
                            beforeContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                            afterContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        }, "strip", z.ZodTypeAny, {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }, {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }>, "many">;
                        totalMatches: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    }, {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                }, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"files">;
                    output: z.ZodObject<{
                        files: z.ZodArray<z.ZodString, "many">;
                        count: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        count: number;
                        files: string[];
                    }, {
                        count: number;
                        files: string[];
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                }, {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"count">;
                    output: z.ZodObject<{
                        counts: z.ZodArray<z.ZodObject<{
                            file: z.ZodString;
                            count: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            count: number;
                            file: string;
                        }, {
                            count: number;
                            file: string;
                        }>, "many">;
                        total: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    }, {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }, {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }>]>>>;
                activeEditorResult: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                    type: z.ZodLiteral<"content">;
                    output: z.ZodObject<{
                        matches: z.ZodArray<z.ZodObject<{
                            file: z.ZodString;
                            lineNumber: z.ZodOptional<z.ZodNumber>;
                            line: z.ZodString;
                            beforeContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                            afterContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        }, "strip", z.ZodTypeAny, {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }, {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }>, "many">;
                        totalMatches: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    }, {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                }, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"files">;
                    output: z.ZodObject<{
                        files: z.ZodArray<z.ZodString, "many">;
                        count: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        count: number;
                        files: string[];
                    }, {
                        count: number;
                        files: string[];
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                }, {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"count">;
                    output: z.ZodObject<{
                        counts: z.ZodArray<z.ZodObject<{
                            file: z.ZodString;
                            count: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            count: number;
                            file: string;
                        }, {
                            count: number;
                            file: string;
                        }>, "many">;
                        total: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    }, {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }, {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                workspaceResults?: Record<string, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }> | undefined;
                activeEditorResult?: {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                } | undefined;
            }, {
                workspaceResults?: Record<string, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }> | undefined;
                activeEditorResult?: {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                } | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                workspaceResults?: Record<string, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }> | undefined;
                activeEditorResult?: {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                } | undefined;
            };
            status: "success";
        }, {
            value: {
                workspaceResults?: Record<string, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }> | undefined;
                activeEditorResult?: {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                } | undefined;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "grep";
        args: {
            pattern: string;
            sort?: string | undefined;
            context?: number | undefined;
            path?: string | undefined;
            type?: string | undefined;
            glob?: string | undefined;
            outputMode?: string | undefined;
            contextBefore?: number | undefined;
            contextAfter?: number | undefined;
            caseInsensitive?: boolean | undefined;
            headLimit?: number | undefined;
            multiline?: boolean | undefined;
            sortAscending?: boolean | undefined;
            offset?: number | undefined;
        };
        result?: {
            value: {
                workspaceResults?: Record<string, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }> | undefined;
                activeEditorResult?: {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                } | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "grep";
        args: {
            pattern: string;
            sort?: string | undefined;
            context?: number | undefined;
            path?: string | undefined;
            type?: string | undefined;
            glob?: string | undefined;
            outputMode?: string | undefined;
            contextBefore?: number | undefined;
            contextAfter?: number | undefined;
            caseInsensitive?: boolean | undefined;
            headLimit?: number | undefined;
            multiline?: boolean | undefined;
            sortAscending?: boolean | undefined;
            offset?: number | undefined;
        };
        result?: {
            value: {
                workspaceResults?: Record<string, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }> | undefined;
                activeEditorResult?: {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                } | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"read">;
        args: z.ZodObject<{
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                content: z.ZodString;
                totalLines: z.ZodNumber;
                fileSize: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                content: string;
                totalLines: number;
                fileSize: number;
            }, {
                content: string;
                totalLines: number;
                fileSize: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                content: string;
                totalLines: number;
                fileSize: number;
            };
            status: "success";
        }, {
            value: {
                content: string;
                totalLines: number;
                fileSize: number;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "read";
        args: {
            path: string;
        };
        result?: {
            value: {
                content: string;
                totalLines: number;
                fileSize: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "read";
        args: {
            path: string;
        };
        result?: {
            value: {
                content: string;
                totalLines: number;
                fileSize: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"edit">;
        args: z.ZodObject<{
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                linesAdded: z.ZodOptional<z.ZodNumber>;
                linesRemoved: z.ZodOptional<z.ZodNumber>;
                diffString: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                linesAdded?: number | undefined;
                linesRemoved?: number | undefined;
                diffString?: string | undefined;
            }, {
                linesAdded?: number | undefined;
                linesRemoved?: number | undefined;
                diffString?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                linesAdded?: number | undefined;
                linesRemoved?: number | undefined;
                diffString?: string | undefined;
            };
            status: "success";
        }, {
            value: {
                linesAdded?: number | undefined;
                linesRemoved?: number | undefined;
                diffString?: string | undefined;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "edit";
        args: {
            path: string;
        };
        result?: {
            value: {
                linesAdded?: number | undefined;
                linesRemoved?: number | undefined;
                diffString?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "edit";
        args: {
            path: string;
        };
        result?: {
            value: {
                linesAdded?: number | undefined;
                linesRemoved?: number | undefined;
                diffString?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ls">;
        args: z.ZodObject<{
            path: z.ZodString;
            ignore: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            path: string;
            ignore?: string[] | undefined;
        }, {
            path: string;
            ignore?: string[] | undefined;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                directoryTreeRoot: z.ZodType<import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode, z.ZodTypeDef, import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode>;
            }, "strip", z.ZodTypeAny, {
                directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
            }, {
                directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
            };
            status: "success";
        }, {
            value: {
                directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "ls";
        args: {
            path: string;
            ignore?: string[] | undefined;
        };
        result?: {
            value: {
                directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "ls";
        args: {
            path: string;
            ignore?: string[] | undefined;
        };
        result?: {
            value: {
                directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"readLints">;
        args: z.ZodObject<{
            paths: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            paths: string[];
        }, {
            paths: string[];
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                fileDiagnostics: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    diagnostics: z.ZodArray<z.ZodObject<{
                        severity: z.ZodEnum<["error", "warning", "information", "hint"]>;
                        range: z.ZodOptional<z.ZodObject<{
                            start: z.ZodOptional<z.ZodObject<{
                                line: z.ZodOptional<z.ZodNumber>;
                                character: z.ZodOptional<z.ZodNumber>;
                            }, "strip", z.ZodTypeAny, {
                                line?: number | undefined;
                                character?: number | undefined;
                            }, {
                                line?: number | undefined;
                                character?: number | undefined;
                            }>>;
                            end: z.ZodOptional<z.ZodObject<{
                                line: z.ZodOptional<z.ZodNumber>;
                                character: z.ZodOptional<z.ZodNumber>;
                            }, "strip", z.ZodTypeAny, {
                                line?: number | undefined;
                                character?: number | undefined;
                            }, {
                                line?: number | undefined;
                                character?: number | undefined;
                            }>>;
                        }, "strip", z.ZodTypeAny, {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        }, {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        }>>;
                        message: z.ZodString;
                        source: z.ZodString;
                        code: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }, {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }>, "many">;
                    diagnosticsCount: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    diagnostics: {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[];
                    diagnosticsCount: number;
                }, {
                    path: string;
                    diagnostics: {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[];
                    diagnosticsCount: number;
                }>, "many">;
                totalFiles: z.ZodNumber;
                totalDiagnostics: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalFiles: number;
                fileDiagnostics: {
                    path: string;
                    diagnostics: {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[];
                    diagnosticsCount: number;
                }[];
                totalDiagnostics: number;
            }, {
                totalFiles: number;
                fileDiagnostics: {
                    path: string;
                    diagnostics: {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[];
                    diagnosticsCount: number;
                }[];
                totalDiagnostics: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                totalFiles: number;
                fileDiagnostics: {
                    path: string;
                    diagnostics: {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[];
                    diagnosticsCount: number;
                }[];
                totalDiagnostics: number;
            };
            status: "success";
        }, {
            value: {
                totalFiles: number;
                fileDiagnostics: {
                    path: string;
                    diagnostics: {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[];
                    diagnosticsCount: number;
                }[];
                totalDiagnostics: number;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "readLints";
        args: {
            paths: string[];
        };
        result?: {
            value: {
                totalFiles: number;
                fileDiagnostics: {
                    path: string;
                    diagnostics: {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[];
                    diagnosticsCount: number;
                }[];
                totalDiagnostics: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "readLints";
        args: {
            paths: string[];
        };
        result?: {
            value: {
                totalFiles: number;
                fileDiagnostics: {
                    path: string;
                    diagnostics: {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[];
                    diagnosticsCount: number;
                }[];
                totalDiagnostics: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"mcp">;
        args: z.ZodObject<{
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            providerIdentifier: z.ZodOptional<z.ZodString>;
            toolName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            args?: Record<string, unknown> | undefined;
            providerIdentifier?: string | undefined;
            toolName?: string | undefined;
        }, {
            args?: Record<string, unknown> | undefined;
            providerIdentifier?: string | undefined;
            toolName?: string | undefined;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                content: z.ZodArray<z.ZodObject<{
                    text: z.ZodOptional<z.ZodObject<{
                        text: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        text: string;
                    }, {
                        text: string;
                    }>>;
                    image: z.ZodOptional<z.ZodObject<{
                        data: z.ZodString;
                        mimeType: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        data: string;
                        mimeType?: string | undefined;
                    }, {
                        data: string;
                        mimeType?: string | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    text?: {
                        text: string;
                    } | undefined;
                    image?: {
                        data: string;
                        mimeType?: string | undefined;
                    } | undefined;
                }, {
                    text?: {
                        text: string;
                    } | undefined;
                    image?: {
                        data: string;
                        mimeType?: string | undefined;
                    } | undefined;
                }>, "many">;
                isError: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                content: {
                    text?: {
                        text: string;
                    } | undefined;
                    image?: {
                        data: string;
                        mimeType?: string | undefined;
                    } | undefined;
                }[];
                isError: boolean;
            }, {
                content: {
                    text?: {
                        text: string;
                    } | undefined;
                    image?: {
                        data: string;
                        mimeType?: string | undefined;
                    } | undefined;
                }[];
                isError: boolean;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                content: {
                    text?: {
                        text: string;
                    } | undefined;
                    image?: {
                        data: string;
                        mimeType?: string | undefined;
                    } | undefined;
                }[];
                isError: boolean;
            };
            status: "success";
        }, {
            value: {
                content: {
                    text?: {
                        text: string;
                    } | undefined;
                    image?: {
                        data: string;
                        mimeType?: string | undefined;
                    } | undefined;
                }[];
                isError: boolean;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "mcp";
        args: {
            args?: Record<string, unknown> | undefined;
            providerIdentifier?: string | undefined;
            toolName?: string | undefined;
        };
        result?: {
            value: {
                content: {
                    text?: {
                        text: string;
                    } | undefined;
                    image?: {
                        data: string;
                        mimeType?: string | undefined;
                    } | undefined;
                }[];
                isError: boolean;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "mcp";
        args: {
            args?: Record<string, unknown> | undefined;
            providerIdentifier?: string | undefined;
            toolName?: string | undefined;
        };
        result?: {
            value: {
                content: {
                    text?: {
                        text: string;
                    } | undefined;
                    image?: {
                        data: string;
                        mimeType?: string | undefined;
                    } | undefined;
                }[];
                isError: boolean;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"generateImage">;
        args: z.ZodObject<{
            description: z.ZodString;
            filePath: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            description: string;
            filePath?: string | undefined;
        }, {
            description: string;
            filePath?: string | undefined;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                filePath: z.ZodString;
                imageData: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                filePath: string;
                imageData: string;
            }, {
                filePath: string;
                imageData: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                filePath: string;
                imageData: string;
            };
            status: "success";
        }, {
            value: {
                filePath: string;
                imageData: string;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "generateImage";
        args: {
            description: string;
            filePath?: string | undefined;
        };
        result?: {
            value: {
                filePath: string;
                imageData: string;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "generateImage";
        args: {
            description: string;
            filePath?: string | undefined;
        };
        result?: {
            value: {
                filePath: string;
                imageData: string;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"recordScreen">;
        args: z.ZodObject<{
            mode: z.ZodEnum<["START_RECORDING", "SAVE_RECORDING", "DISCARD_RECORDING"]>;
        }, "strip", z.ZodTypeAny, {
            mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
        }, {
            mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                wasPriorRecordingCancelled: z.ZodOptional<z.ZodBoolean>;
                path: z.ZodOptional<z.ZodString>;
                recordingDurationMs: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                path?: string | undefined;
                wasPriorRecordingCancelled?: boolean | undefined;
                recordingDurationMs?: number | undefined;
            }, {
                path?: string | undefined;
                wasPriorRecordingCancelled?: boolean | undefined;
                recordingDurationMs?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                path?: string | undefined;
                wasPriorRecordingCancelled?: boolean | undefined;
                recordingDurationMs?: number | undefined;
            };
            status: "success";
        }, {
            value: {
                path?: string | undefined;
                wasPriorRecordingCancelled?: boolean | undefined;
                recordingDurationMs?: number | undefined;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "recordScreen";
        args: {
            mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
        };
        result?: {
            value: {
                path?: string | undefined;
                wasPriorRecordingCancelled?: boolean | undefined;
                recordingDurationMs?: number | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "recordScreen";
        args: {
            mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
        };
        result?: {
            value: {
                path?: string | undefined;
                wasPriorRecordingCancelled?: boolean | undefined;
                recordingDurationMs?: number | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"semSearch">;
        args: z.ZodObject<{
            query: z.ZodString;
            targetDirectories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            explanation: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            query: string;
            targetDirectories?: string[] | undefined;
            explanation?: string | undefined;
        }, {
            query: string;
            targetDirectories?: string[] | undefined;
            explanation?: string | undefined;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                results: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                results: string;
            }, {
                results: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                results: string;
            };
            status: "success";
        }, {
            value: {
                results: string;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "semSearch";
        args: {
            query: string;
            targetDirectories?: string[] | undefined;
            explanation?: string | undefined;
        };
        result?: {
            value: {
                results: string;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "semSearch";
        args: {
            query: string;
            targetDirectories?: string[] | undefined;
            explanation?: string | undefined;
        };
        result?: {
            value: {
                results: string;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"createPlan">;
        args: z.ZodObject<{
            plan: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            plan: string;
        }, {
            plan: string;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            value: {};
            status: "success";
        }, {
            value: {};
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "createPlan";
        args: {
            plan: string;
        };
        result?: {
            value: {};
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "createPlan";
        args: {
            plan: string;
        };
        result?: {
            value: {};
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"updateTodos">;
        args: z.ZodObject<{
            todos: z.ZodArray<z.ZodObject<{
                content: z.ZodString;
                status: z.ZodEnum<["pending", "inProgress", "completed", "cancelled"]>;
            }, "strip", z.ZodTypeAny, {
                status: "cancelled" | "completed" | "pending" | "inProgress";
                content: string;
            }, {
                status: "cancelled" | "completed" | "pending" | "inProgress";
                content: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            todos: {
                status: "cancelled" | "completed" | "pending" | "inProgress";
                content: string;
            }[];
        }, {
            todos: {
                status: "cancelled" | "completed" | "pending" | "inProgress";
                content: string;
            }[];
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                todos: z.ZodArray<z.ZodObject<{
                    content: z.ZodString;
                    status: z.ZodEnum<["pending", "inProgress", "completed", "cancelled"]>;
                }, "strip", z.ZodTypeAny, {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }, {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }>, "many">;
                totalCount: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
                totalCount: number;
            }, {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
                totalCount: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
                totalCount: number;
            };
            status: "success";
        }, {
            value: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
                totalCount: number;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "updateTodos";
        args: {
            todos: {
                status: "cancelled" | "completed" | "pending" | "inProgress";
                content: string;
            }[];
        };
        result?: {
            value: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
                totalCount: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "updateTodos";
        args: {
            todos: {
                status: "cancelled" | "completed" | "pending" | "inProgress";
                content: string;
            }[];
        };
        result?: {
            value: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
                totalCount: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"task">;
        args: z.ZodObject<{
            description: z.ZodString;
            prompt: z.ZodString;
            subagentType: z.ZodOptional<z.ZodObject<{
                kind: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                kind: string;
                name?: string | undefined;
            }, {
                kind: string;
                name?: string | undefined;
            }>>;
            model: z.ZodOptional<z.ZodString>;
            resume: z.ZodOptional<z.ZodString>;
            agentId: z.ZodOptional<z.ZodString>;
            attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            mode: z.ZodOptional<z.ZodEnum<["unspecified", "agent", "plan"]>>;
            respondingToMessageIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            description: string;
            prompt: string;
            resume?: string | undefined;
            agentId?: string | undefined;
            mode?: "plan" | "unspecified" | "agent" | undefined;
            subagentType?: {
                kind: string;
                name?: string | undefined;
            } | undefined;
            model?: string | undefined;
            attachments?: string[] | undefined;
            respondingToMessageIds?: string[] | undefined;
        }, {
            description: string;
            prompt: string;
            resume?: string | undefined;
            agentId?: string | undefined;
            mode?: "plan" | "unspecified" | "agent" | undefined;
            subagentType?: {
                kind: string;
                name?: string | undefined;
            } | undefined;
            model?: string | undefined;
            attachments?: string[] | undefined;
            respondingToMessageIds?: string[] | undefined;
        }>;
        result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
            status: z.ZodLiteral<"success">;
            value: z.ZodObject<{
                conversationSteps: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
                agentId: z.ZodOptional<z.ZodString>;
                isBackground: z.ZodBoolean;
                durationMs: z.ZodOptional<z.ZodNumber>;
                resultSuffix: z.ZodOptional<z.ZodString>;
                backgroundReason: z.ZodEnum<["unspecified", "agentRequest", "userRequest", "queuedFollowUp"]>;
                transcriptPath: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                isBackground: boolean;
                backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                agentId?: string | undefined;
                durationMs?: number | undefined;
                conversationSteps?: unknown[] | undefined;
                resultSuffix?: string | undefined;
                transcriptPath?: string | undefined;
            }, {
                isBackground: boolean;
                backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                agentId?: string | undefined;
                durationMs?: number | undefined;
                conversationSteps?: unknown[] | undefined;
                resultSuffix?: string | undefined;
                transcriptPath?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                isBackground: boolean;
                backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                agentId?: string | undefined;
                durationMs?: number | undefined;
                conversationSteps?: unknown[] | undefined;
                resultSuffix?: string | undefined;
                transcriptPath?: string | undefined;
            };
            status: "success";
        }, {
            value: {
                isBackground: boolean;
                backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                agentId?: string | undefined;
                durationMs?: number | undefined;
                conversationSteps?: unknown[] | undefined;
                resultSuffix?: string | undefined;
                transcriptPath?: string | undefined;
            };
            status: "success";
        }>, z.ZodObject<{
            status: z.ZodLiteral<"error">;
            error: z.ZodTypeAny;
        }, "strip", z.ZodTypeAny, {
            status: "error";
            error?: any;
        }, {
            status: "error";
            error?: any;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        type: "task";
        args: {
            description: string;
            prompt: string;
            resume?: string | undefined;
            agentId?: string | undefined;
            mode?: "plan" | "unspecified" | "agent" | undefined;
            subagentType?: {
                kind: string;
                name?: string | undefined;
            } | undefined;
            model?: string | undefined;
            attachments?: string[] | undefined;
            respondingToMessageIds?: string[] | undefined;
        };
        result?: {
            value: {
                isBackground: boolean;
                backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                agentId?: string | undefined;
                durationMs?: number | undefined;
                conversationSteps?: unknown[] | undefined;
                resultSuffix?: string | undefined;
                transcriptPath?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }, {
        type: "task";
        args: {
            description: string;
            prompt: string;
            resume?: string | undefined;
            agentId?: string | undefined;
            mode?: "plan" | "unspecified" | "agent" | undefined;
            subagentType?: {
                kind: string;
                name?: string | undefined;
            } | undefined;
            model?: string | undefined;
            attachments?: string[] | undefined;
            respondingToMessageIds?: string[] | undefined;
        };
        result?: {
            value: {
                isBackground: boolean;
                backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                agentId?: string | undefined;
                durationMs?: number | undefined;
                conversationSteps?: unknown[] | undefined;
                resultSuffix?: string | undefined;
                transcriptPath?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    message: {
        type: "shell";
        args: {
            command: string;
            timeout?: number | undefined;
            workingDirectory?: string | undefined;
        };
        result?: {
            value: {
                signal: string;
                stdout: string;
                stderr: string;
                exitCode: number;
                executionTime: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "write";
        args: {
            path: string;
            fileText: string;
            returnFileContentAfterWrite?: boolean | undefined;
        };
        result?: {
            value: {
                path: string;
                fileSize: number;
                linesCreated: number;
                fileContentAfterWrite?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "delete";
        args: {
            path: string;
        };
        result?: {
            value: {
                fileSize: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "glob";
        args: {
            globPattern: string;
            targetDirectory?: string | undefined;
        };
        result?: {
            value: {
                files: string[];
                totalFiles: number;
                clientTruncated: boolean;
                ripgrepTruncated: boolean;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "grep";
        args: {
            pattern: string;
            sort?: string | undefined;
            context?: number | undefined;
            path?: string | undefined;
            type?: string | undefined;
            glob?: string | undefined;
            outputMode?: string | undefined;
            contextBefore?: number | undefined;
            contextAfter?: number | undefined;
            caseInsensitive?: boolean | undefined;
            headLimit?: number | undefined;
            multiline?: boolean | undefined;
            sortAscending?: boolean | undefined;
            offset?: number | undefined;
        };
        result?: {
            value: {
                workspaceResults?: Record<string, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }> | undefined;
                activeEditorResult?: {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                } | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "read";
        args: {
            path: string;
        };
        result?: {
            value: {
                content: string;
                totalLines: number;
                fileSize: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "edit";
        args: {
            path: string;
        };
        result?: {
            value: {
                linesAdded?: number | undefined;
                linesRemoved?: number | undefined;
                diffString?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "ls";
        args: {
            path: string;
            ignore?: string[] | undefined;
        };
        result?: {
            value: {
                directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "readLints";
        args: {
            paths: string[];
        };
        result?: {
            value: {
                totalFiles: number;
                fileDiagnostics: {
                    path: string;
                    diagnostics: {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[];
                    diagnosticsCount: number;
                }[];
                totalDiagnostics: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "mcp";
        args: {
            args?: Record<string, unknown> | undefined;
            providerIdentifier?: string | undefined;
            toolName?: string | undefined;
        };
        result?: {
            value: {
                content: {
                    text?: {
                        text: string;
                    } | undefined;
                    image?: {
                        data: string;
                        mimeType?: string | undefined;
                    } | undefined;
                }[];
                isError: boolean;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "semSearch";
        args: {
            query: string;
            targetDirectories?: string[] | undefined;
            explanation?: string | undefined;
        };
        result?: {
            value: {
                results: string;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "generateImage";
        args: {
            description: string;
            filePath?: string | undefined;
        };
        result?: {
            value: {
                filePath: string;
                imageData: string;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "createPlan";
        args: {
            plan: string;
        };
        result?: {
            value: {};
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "recordScreen";
        args: {
            mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
        };
        result?: {
            value: {
                path?: string | undefined;
                wasPriorRecordingCancelled?: boolean | undefined;
                recordingDurationMs?: number | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "updateTodos";
        args: {
            todos: {
                status: "cancelled" | "completed" | "pending" | "inProgress";
                content: string;
            }[];
        };
        result?: {
            value: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
                totalCount: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "task";
        args: {
            description: string;
            prompt: string;
            resume?: string | undefined;
            agentId?: string | undefined;
            mode?: "plan" | "unspecified" | "agent" | undefined;
            subagentType?: {
                kind: string;
                name?: string | undefined;
            } | undefined;
            model?: string | undefined;
            attachments?: string[] | undefined;
            respondingToMessageIds?: string[] | undefined;
        };
        result?: {
            value: {
                isBackground: boolean;
                backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                agentId?: string | undefined;
                durationMs?: number | undefined;
                conversationSteps?: unknown[] | undefined;
                resultSuffix?: string | undefined;
                transcriptPath?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    };
    type: "toolCall";
}, {
    message: {
        type: "shell";
        args: {
            command: string;
            timeout?: number | undefined;
            workingDirectory?: string | undefined;
        };
        result?: {
            value: {
                signal: string;
                stdout: string;
                stderr: string;
                exitCode: number;
                executionTime: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "write";
        args: {
            path: string;
            fileText: string;
            returnFileContentAfterWrite?: boolean | undefined;
        };
        result?: {
            value: {
                path: string;
                fileSize: number;
                linesCreated: number;
                fileContentAfterWrite?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "delete";
        args: {
            path: string;
        };
        result?: {
            value: {
                fileSize: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "glob";
        args: {
            globPattern: string;
            targetDirectory?: string | undefined;
        };
        result?: {
            value: {
                files: string[];
                totalFiles: number;
                clientTruncated: boolean;
                ripgrepTruncated: boolean;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "grep";
        args: {
            pattern: string;
            sort?: string | undefined;
            context?: number | undefined;
            path?: string | undefined;
            type?: string | undefined;
            glob?: string | undefined;
            outputMode?: string | undefined;
            contextBefore?: number | undefined;
            contextAfter?: number | undefined;
            caseInsensitive?: boolean | undefined;
            headLimit?: number | undefined;
            multiline?: boolean | undefined;
            sortAscending?: boolean | undefined;
            offset?: number | undefined;
        };
        result?: {
            value: {
                workspaceResults?: Record<string, {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                }> | undefined;
                activeEditorResult?: {
                    type: "content";
                    output: {
                        totalMatches: number;
                        matches: {
                            file: string;
                            line: string;
                            lineNumber?: number | undefined;
                            beforeContext?: string[] | undefined;
                            afterContext?: string[] | undefined;
                        }[];
                    };
                } | {
                    type: "files";
                    output: {
                        count: number;
                        files: string[];
                    };
                } | {
                    type: "count";
                    output: {
                        counts: {
                            count: number;
                            file: string;
                        }[];
                        total: number;
                    };
                } | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "read";
        args: {
            path: string;
        };
        result?: {
            value: {
                content: string;
                totalLines: number;
                fileSize: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "edit";
        args: {
            path: string;
        };
        result?: {
            value: {
                linesAdded?: number | undefined;
                linesRemoved?: number | undefined;
                diffString?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "ls";
        args: {
            path: string;
            ignore?: string[] | undefined;
        };
        result?: {
            value: {
                directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "readLints";
        args: {
            paths: string[];
        };
        result?: {
            value: {
                totalFiles: number;
                fileDiagnostics: {
                    path: string;
                    diagnostics: {
                        message: string;
                        code: string;
                        source: string;
                        severity: "error" | "hint" | "warning" | "information";
                        range?: {
                            start?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                            end?: {
                                line?: number | undefined;
                                character?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[];
                    diagnosticsCount: number;
                }[];
                totalDiagnostics: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "mcp";
        args: {
            args?: Record<string, unknown> | undefined;
            providerIdentifier?: string | undefined;
            toolName?: string | undefined;
        };
        result?: {
            value: {
                content: {
                    text?: {
                        text: string;
                    } | undefined;
                    image?: {
                        data: string;
                        mimeType?: string | undefined;
                    } | undefined;
                }[];
                isError: boolean;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "semSearch";
        args: {
            query: string;
            targetDirectories?: string[] | undefined;
            explanation?: string | undefined;
        };
        result?: {
            value: {
                results: string;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "generateImage";
        args: {
            description: string;
            filePath?: string | undefined;
        };
        result?: {
            value: {
                filePath: string;
                imageData: string;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "createPlan";
        args: {
            plan: string;
        };
        result?: {
            value: {};
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "recordScreen";
        args: {
            mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
        };
        result?: {
            value: {
                path?: string | undefined;
                wasPriorRecordingCancelled?: boolean | undefined;
                recordingDurationMs?: number | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "updateTodos";
        args: {
            todos: {
                status: "cancelled" | "completed" | "pending" | "inProgress";
                content: string;
            }[];
        };
        result?: {
            value: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
                totalCount: number;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    } | {
        type: "task";
        args: {
            description: string;
            prompt: string;
            resume?: string | undefined;
            agentId?: string | undefined;
            mode?: "plan" | "unspecified" | "agent" | undefined;
            subagentType?: {
                kind: string;
                name?: string | undefined;
            } | undefined;
            model?: string | undefined;
            attachments?: string[] | undefined;
            respondingToMessageIds?: string[] | undefined;
        };
        result?: {
            value: {
                isBackground: boolean;
                backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                agentId?: string | undefined;
                durationMs?: number | undefined;
                conversationSteps?: unknown[] | undefined;
                resultSuffix?: string | undefined;
                transcriptPath?: string | undefined;
            };
            status: "success";
        } | {
            status: "error";
            error?: any;
        } | undefined;
    };
    type: "toolCall";
}>, z.ZodObject<{
    type: z.ZodLiteral<"thinkingMessage">;
    message: z.ZodObject<{
        text: z.ZodString;
        thinkingDurationMs: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        thinkingDurationMs?: number | undefined;
    }, {
        text: string;
        thinkingDurationMs?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    message: {
        text: string;
        thinkingDurationMs?: number | undefined;
    };
    type: "thinkingMessage";
}, {
    message: {
        text: string;
        thinkingDurationMs?: number | undefined;
    };
    type: "thinkingMessage";
}>]>;
export declare const AgentConversationTurnSchema: z.ZodObject<{
    userMessage: z.ZodOptional<z.ZodObject<{
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
    }, {
        text: string;
    }>>;
    steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"assistantMessage">;
        message: z.ZodObject<{
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
        }, {
            text: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        message: {
            text: string;
        };
        type: "assistantMessage";
    }, {
        message: {
            text: string;
        };
        type: "assistantMessage";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"toolCall">;
        message: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"shell">;
            args: z.ZodObject<{
                command: z.ZodString;
                workingDirectory: z.ZodOptional<z.ZodString>;
                timeout: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                command: string;
                timeout?: number | undefined;
                workingDirectory?: string | undefined;
            }, {
                command: string;
                timeout?: number | undefined;
                workingDirectory?: string | undefined;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    exitCode: z.ZodNumber;
                    signal: z.ZodString;
                    stdout: z.ZodString;
                    stderr: z.ZodString;
                    executionTime: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    signal: string;
                    stdout: string;
                    stderr: string;
                    exitCode: number;
                    executionTime: number;
                }, {
                    signal: string;
                    stdout: string;
                    stderr: string;
                    exitCode: number;
                    executionTime: number;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    signal: string;
                    stdout: string;
                    stderr: string;
                    exitCode: number;
                    executionTime: number;
                };
                status: "success";
            }, {
                value: {
                    signal: string;
                    stdout: string;
                    stderr: string;
                    exitCode: number;
                    executionTime: number;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "shell";
            args: {
                command: string;
                timeout?: number | undefined;
                workingDirectory?: string | undefined;
            };
            result?: {
                value: {
                    signal: string;
                    stdout: string;
                    stderr: string;
                    exitCode: number;
                    executionTime: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "shell";
            args: {
                command: string;
                timeout?: number | undefined;
                workingDirectory?: string | undefined;
            };
            result?: {
                value: {
                    signal: string;
                    stdout: string;
                    stderr: string;
                    exitCode: number;
                    executionTime: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"write">;
            args: z.ZodObject<{
                path: z.ZodString;
                fileText: z.ZodString;
                returnFileContentAfterWrite: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                fileText: string;
                returnFileContentAfterWrite?: boolean | undefined;
            }, {
                path: string;
                fileText: string;
                returnFileContentAfterWrite?: boolean | undefined;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    path: z.ZodString;
                    linesCreated: z.ZodNumber;
                    fileSize: z.ZodNumber;
                    fileContentAfterWrite: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    fileSize: number;
                    linesCreated: number;
                    fileContentAfterWrite?: string | undefined;
                }, {
                    path: string;
                    fileSize: number;
                    linesCreated: number;
                    fileContentAfterWrite?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    path: string;
                    fileSize: number;
                    linesCreated: number;
                    fileContentAfterWrite?: string | undefined;
                };
                status: "success";
            }, {
                value: {
                    path: string;
                    fileSize: number;
                    linesCreated: number;
                    fileContentAfterWrite?: string | undefined;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "write";
            args: {
                path: string;
                fileText: string;
                returnFileContentAfterWrite?: boolean | undefined;
            };
            result?: {
                value: {
                    path: string;
                    fileSize: number;
                    linesCreated: number;
                    fileContentAfterWrite?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "write";
            args: {
                path: string;
                fileText: string;
                returnFileContentAfterWrite?: boolean | undefined;
            };
            result?: {
                value: {
                    path: string;
                    fileSize: number;
                    linesCreated: number;
                    fileContentAfterWrite?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"delete">;
            args: z.ZodObject<{
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
            }, {
                path: string;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    fileSize: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    fileSize: number;
                }, {
                    fileSize: number;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    fileSize: number;
                };
                status: "success";
            }, {
                value: {
                    fileSize: number;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "delete";
            args: {
                path: string;
            };
            result?: {
                value: {
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "delete";
            args: {
                path: string;
            };
            result?: {
                value: {
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"glob">;
            args: z.ZodObject<{
                targetDirectory: z.ZodOptional<z.ZodString>;
                globPattern: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                globPattern: string;
                targetDirectory?: string | undefined;
            }, {
                globPattern: string;
                targetDirectory?: string | undefined;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    files: z.ZodArray<z.ZodString, "many">;
                    totalFiles: z.ZodNumber;
                    clientTruncated: z.ZodBoolean;
                    ripgrepTruncated: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    files: string[];
                    totalFiles: number;
                    clientTruncated: boolean;
                    ripgrepTruncated: boolean;
                }, {
                    files: string[];
                    totalFiles: number;
                    clientTruncated: boolean;
                    ripgrepTruncated: boolean;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    files: string[];
                    totalFiles: number;
                    clientTruncated: boolean;
                    ripgrepTruncated: boolean;
                };
                status: "success";
            }, {
                value: {
                    files: string[];
                    totalFiles: number;
                    clientTruncated: boolean;
                    ripgrepTruncated: boolean;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "glob";
            args: {
                globPattern: string;
                targetDirectory?: string | undefined;
            };
            result?: {
                value: {
                    files: string[];
                    totalFiles: number;
                    clientTruncated: boolean;
                    ripgrepTruncated: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "glob";
            args: {
                globPattern: string;
                targetDirectory?: string | undefined;
            };
            result?: {
                value: {
                    files: string[];
                    totalFiles: number;
                    clientTruncated: boolean;
                    ripgrepTruncated: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"grep">;
            args: z.ZodObject<{
                pattern: z.ZodString;
                path: z.ZodOptional<z.ZodString>;
                glob: z.ZodOptional<z.ZodString>;
                outputMode: z.ZodOptional<z.ZodString>;
                contextBefore: z.ZodOptional<z.ZodNumber>;
                contextAfter: z.ZodOptional<z.ZodNumber>;
                context: z.ZodOptional<z.ZodNumber>;
                caseInsensitive: z.ZodOptional<z.ZodBoolean>;
                type: z.ZodOptional<z.ZodString>;
                headLimit: z.ZodOptional<z.ZodNumber>;
                offset: z.ZodOptional<z.ZodNumber>;
                multiline: z.ZodOptional<z.ZodBoolean>;
                sort: z.ZodOptional<z.ZodString>;
                sortAscending: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                pattern: string;
                sort?: string | undefined;
                context?: number | undefined;
                path?: string | undefined;
                type?: string | undefined;
                glob?: string | undefined;
                outputMode?: string | undefined;
                contextBefore?: number | undefined;
                contextAfter?: number | undefined;
                caseInsensitive?: boolean | undefined;
                headLimit?: number | undefined;
                multiline?: boolean | undefined;
                sortAscending?: boolean | undefined;
                offset?: number | undefined;
            }, {
                pattern: string;
                sort?: string | undefined;
                context?: number | undefined;
                path?: string | undefined;
                type?: string | undefined;
                glob?: string | undefined;
                outputMode?: string | undefined;
                contextBefore?: number | undefined;
                contextAfter?: number | undefined;
                caseInsensitive?: boolean | undefined;
                headLimit?: number | undefined;
                multiline?: boolean | undefined;
                sortAscending?: boolean | undefined;
                offset?: number | undefined;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    workspaceResults: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                        type: z.ZodLiteral<"content">;
                        output: z.ZodObject<{
                            matches: z.ZodArray<z.ZodObject<{
                                file: z.ZodString;
                                lineNumber: z.ZodOptional<z.ZodNumber>;
                                line: z.ZodString;
                                beforeContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                                afterContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                            }, "strip", z.ZodTypeAny, {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }, {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }>, "many">;
                            totalMatches: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        }, {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    }, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<"files">;
                        output: z.ZodObject<{
                            files: z.ZodArray<z.ZodString, "many">;
                            count: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            count: number;
                            files: string[];
                        }, {
                            count: number;
                            files: string[];
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    }, {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<"count">;
                        output: z.ZodObject<{
                            counts: z.ZodArray<z.ZodObject<{
                                file: z.ZodString;
                                count: z.ZodNumber;
                            }, "strip", z.ZodTypeAny, {
                                count: number;
                                file: string;
                            }, {
                                count: number;
                                file: string;
                            }>, "many">;
                            total: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        }, {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }, {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }>]>>>;
                    activeEditorResult: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                        type: z.ZodLiteral<"content">;
                        output: z.ZodObject<{
                            matches: z.ZodArray<z.ZodObject<{
                                file: z.ZodString;
                                lineNumber: z.ZodOptional<z.ZodNumber>;
                                line: z.ZodString;
                                beforeContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                                afterContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                            }, "strip", z.ZodTypeAny, {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }, {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }>, "many">;
                            totalMatches: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        }, {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    }, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<"files">;
                        output: z.ZodObject<{
                            files: z.ZodArray<z.ZodString, "many">;
                            count: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            count: number;
                            files: string[];
                        }, {
                            count: number;
                            files: string[];
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    }, {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<"count">;
                        output: z.ZodObject<{
                            counts: z.ZodArray<z.ZodObject<{
                                file: z.ZodString;
                                count: z.ZodNumber;
                            }, "strip", z.ZodTypeAny, {
                                count: number;
                                file: string;
                            }, {
                                count: number;
                                file: string;
                            }>, "many">;
                            total: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        }, {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }, {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }>]>>;
                }, "strip", z.ZodTypeAny, {
                    workspaceResults?: Record<string, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }> | undefined;
                    activeEditorResult?: {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    } | undefined;
                }, {
                    workspaceResults?: Record<string, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }> | undefined;
                    activeEditorResult?: {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    } | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    workspaceResults?: Record<string, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }> | undefined;
                    activeEditorResult?: {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    } | undefined;
                };
                status: "success";
            }, {
                value: {
                    workspaceResults?: Record<string, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }> | undefined;
                    activeEditorResult?: {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    } | undefined;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "grep";
            args: {
                pattern: string;
                sort?: string | undefined;
                context?: number | undefined;
                path?: string | undefined;
                type?: string | undefined;
                glob?: string | undefined;
                outputMode?: string | undefined;
                contextBefore?: number | undefined;
                contextAfter?: number | undefined;
                caseInsensitive?: boolean | undefined;
                headLimit?: number | undefined;
                multiline?: boolean | undefined;
                sortAscending?: boolean | undefined;
                offset?: number | undefined;
            };
            result?: {
                value: {
                    workspaceResults?: Record<string, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }> | undefined;
                    activeEditorResult?: {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    } | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "grep";
            args: {
                pattern: string;
                sort?: string | undefined;
                context?: number | undefined;
                path?: string | undefined;
                type?: string | undefined;
                glob?: string | undefined;
                outputMode?: string | undefined;
                contextBefore?: number | undefined;
                contextAfter?: number | undefined;
                caseInsensitive?: boolean | undefined;
                headLimit?: number | undefined;
                multiline?: boolean | undefined;
                sortAscending?: boolean | undefined;
                offset?: number | undefined;
            };
            result?: {
                value: {
                    workspaceResults?: Record<string, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }> | undefined;
                    activeEditorResult?: {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    } | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"read">;
            args: z.ZodObject<{
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
            }, {
                path: string;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    content: z.ZodString;
                    totalLines: z.ZodNumber;
                    fileSize: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    content: string;
                    totalLines: number;
                    fileSize: number;
                }, {
                    content: string;
                    totalLines: number;
                    fileSize: number;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    content: string;
                    totalLines: number;
                    fileSize: number;
                };
                status: "success";
            }, {
                value: {
                    content: string;
                    totalLines: number;
                    fileSize: number;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "read";
            args: {
                path: string;
            };
            result?: {
                value: {
                    content: string;
                    totalLines: number;
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "read";
            args: {
                path: string;
            };
            result?: {
                value: {
                    content: string;
                    totalLines: number;
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"edit">;
            args: z.ZodObject<{
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
            }, {
                path: string;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    linesAdded: z.ZodOptional<z.ZodNumber>;
                    linesRemoved: z.ZodOptional<z.ZodNumber>;
                    diffString: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    linesAdded?: number | undefined;
                    linesRemoved?: number | undefined;
                    diffString?: string | undefined;
                }, {
                    linesAdded?: number | undefined;
                    linesRemoved?: number | undefined;
                    diffString?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    linesAdded?: number | undefined;
                    linesRemoved?: number | undefined;
                    diffString?: string | undefined;
                };
                status: "success";
            }, {
                value: {
                    linesAdded?: number | undefined;
                    linesRemoved?: number | undefined;
                    diffString?: string | undefined;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "edit";
            args: {
                path: string;
            };
            result?: {
                value: {
                    linesAdded?: number | undefined;
                    linesRemoved?: number | undefined;
                    diffString?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "edit";
            args: {
                path: string;
            };
            result?: {
                value: {
                    linesAdded?: number | undefined;
                    linesRemoved?: number | undefined;
                    diffString?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ls">;
            args: z.ZodObject<{
                path: z.ZodString;
                ignore: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                ignore?: string[] | undefined;
            }, {
                path: string;
                ignore?: string[] | undefined;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    directoryTreeRoot: z.ZodType<import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode, z.ZodTypeDef, import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode>;
                }, "strip", z.ZodTypeAny, {
                    directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                }, {
                    directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                };
                status: "success";
            }, {
                value: {
                    directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ls";
            args: {
                path: string;
                ignore?: string[] | undefined;
            };
            result?: {
                value: {
                    directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "ls";
            args: {
                path: string;
                ignore?: string[] | undefined;
            };
            result?: {
                value: {
                    directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"readLints">;
            args: z.ZodObject<{
                paths: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                paths: string[];
            }, {
                paths: string[];
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    fileDiagnostics: z.ZodArray<z.ZodObject<{
                        path: z.ZodString;
                        diagnostics: z.ZodArray<z.ZodObject<{
                            severity: z.ZodEnum<["error", "warning", "information", "hint"]>;
                            range: z.ZodOptional<z.ZodObject<{
                                start: z.ZodOptional<z.ZodObject<{
                                    line: z.ZodOptional<z.ZodNumber>;
                                    character: z.ZodOptional<z.ZodNumber>;
                                }, "strip", z.ZodTypeAny, {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                }, {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                }>>;
                                end: z.ZodOptional<z.ZodObject<{
                                    line: z.ZodOptional<z.ZodNumber>;
                                    character: z.ZodOptional<z.ZodNumber>;
                                }, "strip", z.ZodTypeAny, {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                }, {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                }>>;
                            }, "strip", z.ZodTypeAny, {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            }, {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            }>>;
                            message: z.ZodString;
                            source: z.ZodString;
                            code: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }, {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }>, "many">;
                        diagnosticsCount: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }, {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }>, "many">;
                    totalFiles: z.ZodNumber;
                    totalDiagnostics: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    totalFiles: number;
                    fileDiagnostics: {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }[];
                    totalDiagnostics: number;
                }, {
                    totalFiles: number;
                    fileDiagnostics: {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }[];
                    totalDiagnostics: number;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    totalFiles: number;
                    fileDiagnostics: {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }[];
                    totalDiagnostics: number;
                };
                status: "success";
            }, {
                value: {
                    totalFiles: number;
                    fileDiagnostics: {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }[];
                    totalDiagnostics: number;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "readLints";
            args: {
                paths: string[];
            };
            result?: {
                value: {
                    totalFiles: number;
                    fileDiagnostics: {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }[];
                    totalDiagnostics: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "readLints";
            args: {
                paths: string[];
            };
            result?: {
                value: {
                    totalFiles: number;
                    fileDiagnostics: {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }[];
                    totalDiagnostics: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"mcp">;
            args: z.ZodObject<{
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                providerIdentifier: z.ZodOptional<z.ZodString>;
                toolName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                args?: Record<string, unknown> | undefined;
                providerIdentifier?: string | undefined;
                toolName?: string | undefined;
            }, {
                args?: Record<string, unknown> | undefined;
                providerIdentifier?: string | undefined;
                toolName?: string | undefined;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    content: z.ZodArray<z.ZodObject<{
                        text: z.ZodOptional<z.ZodObject<{
                            text: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            text: string;
                        }, {
                            text: string;
                        }>>;
                        image: z.ZodOptional<z.ZodObject<{
                            data: z.ZodString;
                            mimeType: z.ZodOptional<z.ZodString>;
                        }, "strip", z.ZodTypeAny, {
                            data: string;
                            mimeType?: string | undefined;
                        }, {
                            data: string;
                            mimeType?: string | undefined;
                        }>>;
                    }, "strip", z.ZodTypeAny, {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }, {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }>, "many">;
                    isError: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    content: {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }[];
                    isError: boolean;
                }, {
                    content: {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }[];
                    isError: boolean;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    content: {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }[];
                    isError: boolean;
                };
                status: "success";
            }, {
                value: {
                    content: {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }[];
                    isError: boolean;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "mcp";
            args: {
                args?: Record<string, unknown> | undefined;
                providerIdentifier?: string | undefined;
                toolName?: string | undefined;
            };
            result?: {
                value: {
                    content: {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }[];
                    isError: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "mcp";
            args: {
                args?: Record<string, unknown> | undefined;
                providerIdentifier?: string | undefined;
                toolName?: string | undefined;
            };
            result?: {
                value: {
                    content: {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }[];
                    isError: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"generateImage">;
            args: z.ZodObject<{
                description: z.ZodString;
                filePath: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                description: string;
                filePath?: string | undefined;
            }, {
                description: string;
                filePath?: string | undefined;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    filePath: z.ZodString;
                    imageData: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    filePath: string;
                    imageData: string;
                }, {
                    filePath: string;
                    imageData: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    filePath: string;
                    imageData: string;
                };
                status: "success";
            }, {
                value: {
                    filePath: string;
                    imageData: string;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "generateImage";
            args: {
                description: string;
                filePath?: string | undefined;
            };
            result?: {
                value: {
                    filePath: string;
                    imageData: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "generateImage";
            args: {
                description: string;
                filePath?: string | undefined;
            };
            result?: {
                value: {
                    filePath: string;
                    imageData: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"recordScreen">;
            args: z.ZodObject<{
                mode: z.ZodEnum<["START_RECORDING", "SAVE_RECORDING", "DISCARD_RECORDING"]>;
            }, "strip", z.ZodTypeAny, {
                mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
            }, {
                mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    wasPriorRecordingCancelled: z.ZodOptional<z.ZodBoolean>;
                    path: z.ZodOptional<z.ZodString>;
                    recordingDurationMs: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    path?: string | undefined;
                    wasPriorRecordingCancelled?: boolean | undefined;
                    recordingDurationMs?: number | undefined;
                }, {
                    path?: string | undefined;
                    wasPriorRecordingCancelled?: boolean | undefined;
                    recordingDurationMs?: number | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    path?: string | undefined;
                    wasPriorRecordingCancelled?: boolean | undefined;
                    recordingDurationMs?: number | undefined;
                };
                status: "success";
            }, {
                value: {
                    path?: string | undefined;
                    wasPriorRecordingCancelled?: boolean | undefined;
                    recordingDurationMs?: number | undefined;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "recordScreen";
            args: {
                mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
            };
            result?: {
                value: {
                    path?: string | undefined;
                    wasPriorRecordingCancelled?: boolean | undefined;
                    recordingDurationMs?: number | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "recordScreen";
            args: {
                mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
            };
            result?: {
                value: {
                    path?: string | undefined;
                    wasPriorRecordingCancelled?: boolean | undefined;
                    recordingDurationMs?: number | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"semSearch">;
            args: z.ZodObject<{
                query: z.ZodString;
                targetDirectories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                explanation: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                query: string;
                targetDirectories?: string[] | undefined;
                explanation?: string | undefined;
            }, {
                query: string;
                targetDirectories?: string[] | undefined;
                explanation?: string | undefined;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    results: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    results: string;
                }, {
                    results: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    results: string;
                };
                status: "success";
            }, {
                value: {
                    results: string;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "semSearch";
            args: {
                query: string;
                targetDirectories?: string[] | undefined;
                explanation?: string | undefined;
            };
            result?: {
                value: {
                    results: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "semSearch";
            args: {
                query: string;
                targetDirectories?: string[] | undefined;
                explanation?: string | undefined;
            };
            result?: {
                value: {
                    results: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"createPlan">;
            args: z.ZodObject<{
                plan: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                plan: string;
            }, {
                plan: string;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                value: {};
                status: "success";
            }, {
                value: {};
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "createPlan";
            args: {
                plan: string;
            };
            result?: {
                value: {};
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "createPlan";
            args: {
                plan: string;
            };
            result?: {
                value: {};
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"updateTodos">;
            args: z.ZodObject<{
                todos: z.ZodArray<z.ZodObject<{
                    content: z.ZodString;
                    status: z.ZodEnum<["pending", "inProgress", "completed", "cancelled"]>;
                }, "strip", z.ZodTypeAny, {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }, {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
            }, {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    todos: z.ZodArray<z.ZodObject<{
                        content: z.ZodString;
                        status: z.ZodEnum<["pending", "inProgress", "completed", "cancelled"]>;
                    }, "strip", z.ZodTypeAny, {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }, {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }>, "many">;
                    totalCount: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                    totalCount: number;
                }, {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                    totalCount: number;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                    totalCount: number;
                };
                status: "success";
            }, {
                value: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                    totalCount: number;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "updateTodos";
            args: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
            };
            result?: {
                value: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                    totalCount: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "updateTodos";
            args: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
            };
            result?: {
                value: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                    totalCount: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"task">;
            args: z.ZodObject<{
                description: z.ZodString;
                prompt: z.ZodString;
                subagentType: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodString;
                    name: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    kind: string;
                    name?: string | undefined;
                }, {
                    kind: string;
                    name?: string | undefined;
                }>>;
                model: z.ZodOptional<z.ZodString>;
                resume: z.ZodOptional<z.ZodString>;
                agentId: z.ZodOptional<z.ZodString>;
                attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                mode: z.ZodOptional<z.ZodEnum<["unspecified", "agent", "plan"]>>;
                respondingToMessageIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                description: string;
                prompt: string;
                resume?: string | undefined;
                agentId?: string | undefined;
                mode?: "plan" | "unspecified" | "agent" | undefined;
                subagentType?: {
                    kind: string;
                    name?: string | undefined;
                } | undefined;
                model?: string | undefined;
                attachments?: string[] | undefined;
                respondingToMessageIds?: string[] | undefined;
            }, {
                description: string;
                prompt: string;
                resume?: string | undefined;
                agentId?: string | undefined;
                mode?: "plan" | "unspecified" | "agent" | undefined;
                subagentType?: {
                    kind: string;
                    name?: string | undefined;
                } | undefined;
                model?: string | undefined;
                attachments?: string[] | undefined;
                respondingToMessageIds?: string[] | undefined;
            }>;
            result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                status: z.ZodLiteral<"success">;
                value: z.ZodObject<{
                    conversationSteps: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
                    agentId: z.ZodOptional<z.ZodString>;
                    isBackground: z.ZodBoolean;
                    durationMs: z.ZodOptional<z.ZodNumber>;
                    resultSuffix: z.ZodOptional<z.ZodString>;
                    backgroundReason: z.ZodEnum<["unspecified", "agentRequest", "userRequest", "queuedFollowUp"]>;
                    transcriptPath: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    isBackground: boolean;
                    backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                    agentId?: string | undefined;
                    durationMs?: number | undefined;
                    conversationSteps?: unknown[] | undefined;
                    resultSuffix?: string | undefined;
                    transcriptPath?: string | undefined;
                }, {
                    isBackground: boolean;
                    backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                    agentId?: string | undefined;
                    durationMs?: number | undefined;
                    conversationSteps?: unknown[] | undefined;
                    resultSuffix?: string | undefined;
                    transcriptPath?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                value: {
                    isBackground: boolean;
                    backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                    agentId?: string | undefined;
                    durationMs?: number | undefined;
                    conversationSteps?: unknown[] | undefined;
                    resultSuffix?: string | undefined;
                    transcriptPath?: string | undefined;
                };
                status: "success";
            }, {
                value: {
                    isBackground: boolean;
                    backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                    agentId?: string | undefined;
                    durationMs?: number | undefined;
                    conversationSteps?: unknown[] | undefined;
                    resultSuffix?: string | undefined;
                    transcriptPath?: string | undefined;
                };
                status: "success";
            }>, z.ZodObject<{
                status: z.ZodLiteral<"error">;
                error: z.ZodTypeAny;
            }, "strip", z.ZodTypeAny, {
                status: "error";
                error?: any;
            }, {
                status: "error";
                error?: any;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            type: "task";
            args: {
                description: string;
                prompt: string;
                resume?: string | undefined;
                agentId?: string | undefined;
                mode?: "plan" | "unspecified" | "agent" | undefined;
                subagentType?: {
                    kind: string;
                    name?: string | undefined;
                } | undefined;
                model?: string | undefined;
                attachments?: string[] | undefined;
                respondingToMessageIds?: string[] | undefined;
            };
            result?: {
                value: {
                    isBackground: boolean;
                    backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                    agentId?: string | undefined;
                    durationMs?: number | undefined;
                    conversationSteps?: unknown[] | undefined;
                    resultSuffix?: string | undefined;
                    transcriptPath?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }, {
            type: "task";
            args: {
                description: string;
                prompt: string;
                resume?: string | undefined;
                agentId?: string | undefined;
                mode?: "plan" | "unspecified" | "agent" | undefined;
                subagentType?: {
                    kind: string;
                    name?: string | undefined;
                } | undefined;
                model?: string | undefined;
                attachments?: string[] | undefined;
                respondingToMessageIds?: string[] | undefined;
            };
            result?: {
                value: {
                    isBackground: boolean;
                    backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                    agentId?: string | undefined;
                    durationMs?: number | undefined;
                    conversationSteps?: unknown[] | undefined;
                    resultSuffix?: string | undefined;
                    transcriptPath?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        message: {
            type: "shell";
            args: {
                command: string;
                timeout?: number | undefined;
                workingDirectory?: string | undefined;
            };
            result?: {
                value: {
                    signal: string;
                    stdout: string;
                    stderr: string;
                    exitCode: number;
                    executionTime: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "write";
            args: {
                path: string;
                fileText: string;
                returnFileContentAfterWrite?: boolean | undefined;
            };
            result?: {
                value: {
                    path: string;
                    fileSize: number;
                    linesCreated: number;
                    fileContentAfterWrite?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "delete";
            args: {
                path: string;
            };
            result?: {
                value: {
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "glob";
            args: {
                globPattern: string;
                targetDirectory?: string | undefined;
            };
            result?: {
                value: {
                    files: string[];
                    totalFiles: number;
                    clientTruncated: boolean;
                    ripgrepTruncated: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "grep";
            args: {
                pattern: string;
                sort?: string | undefined;
                context?: number | undefined;
                path?: string | undefined;
                type?: string | undefined;
                glob?: string | undefined;
                outputMode?: string | undefined;
                contextBefore?: number | undefined;
                contextAfter?: number | undefined;
                caseInsensitive?: boolean | undefined;
                headLimit?: number | undefined;
                multiline?: boolean | undefined;
                sortAscending?: boolean | undefined;
                offset?: number | undefined;
            };
            result?: {
                value: {
                    workspaceResults?: Record<string, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }> | undefined;
                    activeEditorResult?: {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    } | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "read";
            args: {
                path: string;
            };
            result?: {
                value: {
                    content: string;
                    totalLines: number;
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "edit";
            args: {
                path: string;
            };
            result?: {
                value: {
                    linesAdded?: number | undefined;
                    linesRemoved?: number | undefined;
                    diffString?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "ls";
            args: {
                path: string;
                ignore?: string[] | undefined;
            };
            result?: {
                value: {
                    directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "readLints";
            args: {
                paths: string[];
            };
            result?: {
                value: {
                    totalFiles: number;
                    fileDiagnostics: {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }[];
                    totalDiagnostics: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "mcp";
            args: {
                args?: Record<string, unknown> | undefined;
                providerIdentifier?: string | undefined;
                toolName?: string | undefined;
            };
            result?: {
                value: {
                    content: {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }[];
                    isError: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "semSearch";
            args: {
                query: string;
                targetDirectories?: string[] | undefined;
                explanation?: string | undefined;
            };
            result?: {
                value: {
                    results: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "generateImage";
            args: {
                description: string;
                filePath?: string | undefined;
            };
            result?: {
                value: {
                    filePath: string;
                    imageData: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "createPlan";
            args: {
                plan: string;
            };
            result?: {
                value: {};
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "recordScreen";
            args: {
                mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
            };
            result?: {
                value: {
                    path?: string | undefined;
                    wasPriorRecordingCancelled?: boolean | undefined;
                    recordingDurationMs?: number | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "updateTodos";
            args: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
            };
            result?: {
                value: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                    totalCount: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "task";
            args: {
                description: string;
                prompt: string;
                resume?: string | undefined;
                agentId?: string | undefined;
                mode?: "plan" | "unspecified" | "agent" | undefined;
                subagentType?: {
                    kind: string;
                    name?: string | undefined;
                } | undefined;
                model?: string | undefined;
                attachments?: string[] | undefined;
                respondingToMessageIds?: string[] | undefined;
            };
            result?: {
                value: {
                    isBackground: boolean;
                    backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                    agentId?: string | undefined;
                    durationMs?: number | undefined;
                    conversationSteps?: unknown[] | undefined;
                    resultSuffix?: string | undefined;
                    transcriptPath?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        };
        type: "toolCall";
    }, {
        message: {
            type: "shell";
            args: {
                command: string;
                timeout?: number | undefined;
                workingDirectory?: string | undefined;
            };
            result?: {
                value: {
                    signal: string;
                    stdout: string;
                    stderr: string;
                    exitCode: number;
                    executionTime: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "write";
            args: {
                path: string;
                fileText: string;
                returnFileContentAfterWrite?: boolean | undefined;
            };
            result?: {
                value: {
                    path: string;
                    fileSize: number;
                    linesCreated: number;
                    fileContentAfterWrite?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "delete";
            args: {
                path: string;
            };
            result?: {
                value: {
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "glob";
            args: {
                globPattern: string;
                targetDirectory?: string | undefined;
            };
            result?: {
                value: {
                    files: string[];
                    totalFiles: number;
                    clientTruncated: boolean;
                    ripgrepTruncated: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "grep";
            args: {
                pattern: string;
                sort?: string | undefined;
                context?: number | undefined;
                path?: string | undefined;
                type?: string | undefined;
                glob?: string | undefined;
                outputMode?: string | undefined;
                contextBefore?: number | undefined;
                contextAfter?: number | undefined;
                caseInsensitive?: boolean | undefined;
                headLimit?: number | undefined;
                multiline?: boolean | undefined;
                sortAscending?: boolean | undefined;
                offset?: number | undefined;
            };
            result?: {
                value: {
                    workspaceResults?: Record<string, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }> | undefined;
                    activeEditorResult?: {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    } | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "read";
            args: {
                path: string;
            };
            result?: {
                value: {
                    content: string;
                    totalLines: number;
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "edit";
            args: {
                path: string;
            };
            result?: {
                value: {
                    linesAdded?: number | undefined;
                    linesRemoved?: number | undefined;
                    diffString?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "ls";
            args: {
                path: string;
                ignore?: string[] | undefined;
            };
            result?: {
                value: {
                    directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "readLints";
            args: {
                paths: string[];
            };
            result?: {
                value: {
                    totalFiles: number;
                    fileDiagnostics: {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }[];
                    totalDiagnostics: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "mcp";
            args: {
                args?: Record<string, unknown> | undefined;
                providerIdentifier?: string | undefined;
                toolName?: string | undefined;
            };
            result?: {
                value: {
                    content: {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }[];
                    isError: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "semSearch";
            args: {
                query: string;
                targetDirectories?: string[] | undefined;
                explanation?: string | undefined;
            };
            result?: {
                value: {
                    results: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "generateImage";
            args: {
                description: string;
                filePath?: string | undefined;
            };
            result?: {
                value: {
                    filePath: string;
                    imageData: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "createPlan";
            args: {
                plan: string;
            };
            result?: {
                value: {};
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "recordScreen";
            args: {
                mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
            };
            result?: {
                value: {
                    path?: string | undefined;
                    wasPriorRecordingCancelled?: boolean | undefined;
                    recordingDurationMs?: number | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "updateTodos";
            args: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
            };
            result?: {
                value: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                    totalCount: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "task";
            args: {
                description: string;
                prompt: string;
                resume?: string | undefined;
                agentId?: string | undefined;
                mode?: "plan" | "unspecified" | "agent" | undefined;
                subagentType?: {
                    kind: string;
                    name?: string | undefined;
                } | undefined;
                model?: string | undefined;
                attachments?: string[] | undefined;
                respondingToMessageIds?: string[] | undefined;
            };
            result?: {
                value: {
                    isBackground: boolean;
                    backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                    agentId?: string | undefined;
                    durationMs?: number | undefined;
                    conversationSteps?: unknown[] | undefined;
                    resultSuffix?: string | undefined;
                    transcriptPath?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        };
        type: "toolCall";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"thinkingMessage">;
        message: z.ZodObject<{
            text: z.ZodString;
            thinkingDurationMs: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            thinkingDurationMs?: number | undefined;
        }, {
            text: string;
            thinkingDurationMs?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        message: {
            text: string;
            thinkingDurationMs?: number | undefined;
        };
        type: "thinkingMessage";
    }, {
        message: {
            text: string;
            thinkingDurationMs?: number | undefined;
        };
        type: "thinkingMessage";
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    steps: ({
        message: {
            text: string;
        };
        type: "assistantMessage";
    } | {
        message: {
            type: "shell";
            args: {
                command: string;
                timeout?: number | undefined;
                workingDirectory?: string | undefined;
            };
            result?: {
                value: {
                    signal: string;
                    stdout: string;
                    stderr: string;
                    exitCode: number;
                    executionTime: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "write";
            args: {
                path: string;
                fileText: string;
                returnFileContentAfterWrite?: boolean | undefined;
            };
            result?: {
                value: {
                    path: string;
                    fileSize: number;
                    linesCreated: number;
                    fileContentAfterWrite?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "delete";
            args: {
                path: string;
            };
            result?: {
                value: {
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "glob";
            args: {
                globPattern: string;
                targetDirectory?: string | undefined;
            };
            result?: {
                value: {
                    files: string[];
                    totalFiles: number;
                    clientTruncated: boolean;
                    ripgrepTruncated: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "grep";
            args: {
                pattern: string;
                sort?: string | undefined;
                context?: number | undefined;
                path?: string | undefined;
                type?: string | undefined;
                glob?: string | undefined;
                outputMode?: string | undefined;
                contextBefore?: number | undefined;
                contextAfter?: number | undefined;
                caseInsensitive?: boolean | undefined;
                headLimit?: number | undefined;
                multiline?: boolean | undefined;
                sortAscending?: boolean | undefined;
                offset?: number | undefined;
            };
            result?: {
                value: {
                    workspaceResults?: Record<string, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }> | undefined;
                    activeEditorResult?: {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    } | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "read";
            args: {
                path: string;
            };
            result?: {
                value: {
                    content: string;
                    totalLines: number;
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "edit";
            args: {
                path: string;
            };
            result?: {
                value: {
                    linesAdded?: number | undefined;
                    linesRemoved?: number | undefined;
                    diffString?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "ls";
            args: {
                path: string;
                ignore?: string[] | undefined;
            };
            result?: {
                value: {
                    directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "readLints";
            args: {
                paths: string[];
            };
            result?: {
                value: {
                    totalFiles: number;
                    fileDiagnostics: {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }[];
                    totalDiagnostics: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "mcp";
            args: {
                args?: Record<string, unknown> | undefined;
                providerIdentifier?: string | undefined;
                toolName?: string | undefined;
            };
            result?: {
                value: {
                    content: {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }[];
                    isError: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "semSearch";
            args: {
                query: string;
                targetDirectories?: string[] | undefined;
                explanation?: string | undefined;
            };
            result?: {
                value: {
                    results: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "generateImage";
            args: {
                description: string;
                filePath?: string | undefined;
            };
            result?: {
                value: {
                    filePath: string;
                    imageData: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "createPlan";
            args: {
                plan: string;
            };
            result?: {
                value: {};
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "recordScreen";
            args: {
                mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
            };
            result?: {
                value: {
                    path?: string | undefined;
                    wasPriorRecordingCancelled?: boolean | undefined;
                    recordingDurationMs?: number | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "updateTodos";
            args: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
            };
            result?: {
                value: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                    totalCount: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "task";
            args: {
                description: string;
                prompt: string;
                resume?: string | undefined;
                agentId?: string | undefined;
                mode?: "plan" | "unspecified" | "agent" | undefined;
                subagentType?: {
                    kind: string;
                    name?: string | undefined;
                } | undefined;
                model?: string | undefined;
                attachments?: string[] | undefined;
                respondingToMessageIds?: string[] | undefined;
            };
            result?: {
                value: {
                    isBackground: boolean;
                    backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                    agentId?: string | undefined;
                    durationMs?: number | undefined;
                    conversationSteps?: unknown[] | undefined;
                    resultSuffix?: string | undefined;
                    transcriptPath?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        };
        type: "toolCall";
    } | {
        message: {
            text: string;
            thinkingDurationMs?: number | undefined;
        };
        type: "thinkingMessage";
    })[];
    userMessage?: {
        text: string;
    } | undefined;
}, {
    steps: ({
        message: {
            text: string;
        };
        type: "assistantMessage";
    } | {
        message: {
            type: "shell";
            args: {
                command: string;
                timeout?: number | undefined;
                workingDirectory?: string | undefined;
            };
            result?: {
                value: {
                    signal: string;
                    stdout: string;
                    stderr: string;
                    exitCode: number;
                    executionTime: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "write";
            args: {
                path: string;
                fileText: string;
                returnFileContentAfterWrite?: boolean | undefined;
            };
            result?: {
                value: {
                    path: string;
                    fileSize: number;
                    linesCreated: number;
                    fileContentAfterWrite?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "delete";
            args: {
                path: string;
            };
            result?: {
                value: {
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "glob";
            args: {
                globPattern: string;
                targetDirectory?: string | undefined;
            };
            result?: {
                value: {
                    files: string[];
                    totalFiles: number;
                    clientTruncated: boolean;
                    ripgrepTruncated: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "grep";
            args: {
                pattern: string;
                sort?: string | undefined;
                context?: number | undefined;
                path?: string | undefined;
                type?: string | undefined;
                glob?: string | undefined;
                outputMode?: string | undefined;
                contextBefore?: number | undefined;
                contextAfter?: number | undefined;
                caseInsensitive?: boolean | undefined;
                headLimit?: number | undefined;
                multiline?: boolean | undefined;
                sortAscending?: boolean | undefined;
                offset?: number | undefined;
            };
            result?: {
                value: {
                    workspaceResults?: Record<string, {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    }> | undefined;
                    activeEditorResult?: {
                        type: "content";
                        output: {
                            totalMatches: number;
                            matches: {
                                file: string;
                                line: string;
                                lineNumber?: number | undefined;
                                beforeContext?: string[] | undefined;
                                afterContext?: string[] | undefined;
                            }[];
                        };
                    } | {
                        type: "files";
                        output: {
                            count: number;
                            files: string[];
                        };
                    } | {
                        type: "count";
                        output: {
                            counts: {
                                count: number;
                                file: string;
                            }[];
                            total: number;
                        };
                    } | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "read";
            args: {
                path: string;
            };
            result?: {
                value: {
                    content: string;
                    totalLines: number;
                    fileSize: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "edit";
            args: {
                path: string;
            };
            result?: {
                value: {
                    linesAdded?: number | undefined;
                    linesRemoved?: number | undefined;
                    diffString?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "ls";
            args: {
                path: string;
                ignore?: string[] | undefined;
            };
            result?: {
                value: {
                    directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "readLints";
            args: {
                paths: string[];
            };
            result?: {
                value: {
                    totalFiles: number;
                    fileDiagnostics: {
                        path: string;
                        diagnostics: {
                            message: string;
                            code: string;
                            source: string;
                            severity: "error" | "hint" | "warning" | "information";
                            range?: {
                                start?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                                end?: {
                                    line?: number | undefined;
                                    character?: number | undefined;
                                } | undefined;
                            } | undefined;
                        }[];
                        diagnosticsCount: number;
                    }[];
                    totalDiagnostics: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "mcp";
            args: {
                args?: Record<string, unknown> | undefined;
                providerIdentifier?: string | undefined;
                toolName?: string | undefined;
            };
            result?: {
                value: {
                    content: {
                        text?: {
                            text: string;
                        } | undefined;
                        image?: {
                            data: string;
                            mimeType?: string | undefined;
                        } | undefined;
                    }[];
                    isError: boolean;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "semSearch";
            args: {
                query: string;
                targetDirectories?: string[] | undefined;
                explanation?: string | undefined;
            };
            result?: {
                value: {
                    results: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "generateImage";
            args: {
                description: string;
                filePath?: string | undefined;
            };
            result?: {
                value: {
                    filePath: string;
                    imageData: string;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "createPlan";
            args: {
                plan: string;
            };
            result?: {
                value: {};
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "recordScreen";
            args: {
                mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
            };
            result?: {
                value: {
                    path?: string | undefined;
                    wasPriorRecordingCancelled?: boolean | undefined;
                    recordingDurationMs?: number | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "updateTodos";
            args: {
                todos: {
                    status: "cancelled" | "completed" | "pending" | "inProgress";
                    content: string;
                }[];
            };
            result?: {
                value: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                    totalCount: number;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        } | {
            type: "task";
            args: {
                description: string;
                prompt: string;
                resume?: string | undefined;
                agentId?: string | undefined;
                mode?: "plan" | "unspecified" | "agent" | undefined;
                subagentType?: {
                    kind: string;
                    name?: string | undefined;
                } | undefined;
                model?: string | undefined;
                attachments?: string[] | undefined;
                respondingToMessageIds?: string[] | undefined;
            };
            result?: {
                value: {
                    isBackground: boolean;
                    backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                    agentId?: string | undefined;
                    durationMs?: number | undefined;
                    conversationSteps?: unknown[] | undefined;
                    resultSuffix?: string | undefined;
                    transcriptPath?: string | undefined;
                };
                status: "success";
            } | {
                status: "error";
                error?: any;
            } | undefined;
        };
        type: "toolCall";
    } | {
        message: {
            text: string;
            thinkingDurationMs?: number | undefined;
        };
        type: "thinkingMessage";
    })[];
    userMessage?: {
        text: string;
    } | undefined;
}>;
export declare const ShellConversationTurnSchema: z.ZodObject<{
    shellCommand: z.ZodOptional<z.ZodObject<{
        command: z.ZodString;
        workingDirectory: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        command: string;
        workingDirectory?: string | undefined;
    }, {
        command: string;
        workingDirectory?: string | undefined;
    }>>;
    shellOutput: z.ZodOptional<z.ZodObject<{
        stdout: z.ZodString;
        stderr: z.ZodString;
        exitCode: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stdout: string;
        stderr: string;
        exitCode: number;
    }, {
        stdout: string;
        stderr: string;
        exitCode: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    shellCommand?: {
        command: string;
        workingDirectory?: string | undefined;
    } | undefined;
    shellOutput?: {
        stdout: string;
        stderr: string;
        exitCode: number;
    } | undefined;
}, {
    shellCommand?: {
        command: string;
        workingDirectory?: string | undefined;
    } | undefined;
    shellOutput?: {
        stdout: string;
        stderr: string;
        exitCode: number;
    } | undefined;
}>;
export declare const ConversationTurnSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"agentConversationTurn">;
    turn: z.ZodObject<{
        userMessage: z.ZodOptional<z.ZodObject<{
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
        }, {
            text: string;
        }>>;
        steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"assistantMessage">;
            message: z.ZodObject<{
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
            }, {
                text: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            message: {
                text: string;
            };
            type: "assistantMessage";
        }, {
            message: {
                text: string;
            };
            type: "assistantMessage";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"toolCall">;
            message: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"shell">;
                args: z.ZodObject<{
                    command: z.ZodString;
                    workingDirectory: z.ZodOptional<z.ZodString>;
                    timeout: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    command: string;
                    timeout?: number | undefined;
                    workingDirectory?: string | undefined;
                }, {
                    command: string;
                    timeout?: number | undefined;
                    workingDirectory?: string | undefined;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        exitCode: z.ZodNumber;
                        signal: z.ZodString;
                        stdout: z.ZodString;
                        stderr: z.ZodString;
                        executionTime: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    }, {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    };
                    status: "success";
                }, {
                    value: {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "shell";
                args: {
                    command: string;
                    timeout?: number | undefined;
                    workingDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "shell";
                args: {
                    command: string;
                    timeout?: number | undefined;
                    workingDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"write">;
                args: z.ZodObject<{
                    path: z.ZodString;
                    fileText: z.ZodString;
                    returnFileContentAfterWrite: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    fileText: string;
                    returnFileContentAfterWrite?: boolean | undefined;
                }, {
                    path: string;
                    fileText: string;
                    returnFileContentAfterWrite?: boolean | undefined;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        path: z.ZodString;
                        linesCreated: z.ZodNumber;
                        fileSize: z.ZodNumber;
                        fileContentAfterWrite: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    }, {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    };
                    status: "success";
                }, {
                    value: {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "write";
                args: {
                    path: string;
                    fileText: string;
                    returnFileContentAfterWrite?: boolean | undefined;
                };
                result?: {
                    value: {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "write";
                args: {
                    path: string;
                    fileText: string;
                    returnFileContentAfterWrite?: boolean | undefined;
                };
                result?: {
                    value: {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"delete">;
                args: z.ZodObject<{
                    path: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                }, {
                    path: string;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        fileSize: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        fileSize: number;
                    }, {
                        fileSize: number;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        fileSize: number;
                    };
                    status: "success";
                }, {
                    value: {
                        fileSize: number;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "delete";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "delete";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"glob">;
                args: z.ZodObject<{
                    targetDirectory: z.ZodOptional<z.ZodString>;
                    globPattern: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    globPattern: string;
                    targetDirectory?: string | undefined;
                }, {
                    globPattern: string;
                    targetDirectory?: string | undefined;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        files: z.ZodArray<z.ZodString, "many">;
                        totalFiles: z.ZodNumber;
                        clientTruncated: z.ZodBoolean;
                        ripgrepTruncated: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    }, {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    };
                    status: "success";
                }, {
                    value: {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "glob";
                args: {
                    globPattern: string;
                    targetDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "glob";
                args: {
                    globPattern: string;
                    targetDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"grep">;
                args: z.ZodObject<{
                    pattern: z.ZodString;
                    path: z.ZodOptional<z.ZodString>;
                    glob: z.ZodOptional<z.ZodString>;
                    outputMode: z.ZodOptional<z.ZodString>;
                    contextBefore: z.ZodOptional<z.ZodNumber>;
                    contextAfter: z.ZodOptional<z.ZodNumber>;
                    context: z.ZodOptional<z.ZodNumber>;
                    caseInsensitive: z.ZodOptional<z.ZodBoolean>;
                    type: z.ZodOptional<z.ZodString>;
                    headLimit: z.ZodOptional<z.ZodNumber>;
                    offset: z.ZodOptional<z.ZodNumber>;
                    multiline: z.ZodOptional<z.ZodBoolean>;
                    sort: z.ZodOptional<z.ZodString>;
                    sortAscending: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    pattern: string;
                    sort?: string | undefined;
                    context?: number | undefined;
                    path?: string | undefined;
                    type?: string | undefined;
                    glob?: string | undefined;
                    outputMode?: string | undefined;
                    contextBefore?: number | undefined;
                    contextAfter?: number | undefined;
                    caseInsensitive?: boolean | undefined;
                    headLimit?: number | undefined;
                    multiline?: boolean | undefined;
                    sortAscending?: boolean | undefined;
                    offset?: number | undefined;
                }, {
                    pattern: string;
                    sort?: string | undefined;
                    context?: number | undefined;
                    path?: string | undefined;
                    type?: string | undefined;
                    glob?: string | undefined;
                    outputMode?: string | undefined;
                    contextBefore?: number | undefined;
                    contextAfter?: number | undefined;
                    caseInsensitive?: boolean | undefined;
                    headLimit?: number | undefined;
                    multiline?: boolean | undefined;
                    sortAscending?: boolean | undefined;
                    offset?: number | undefined;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        workspaceResults: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                            type: z.ZodLiteral<"content">;
                            output: z.ZodObject<{
                                matches: z.ZodArray<z.ZodObject<{
                                    file: z.ZodString;
                                    lineNumber: z.ZodOptional<z.ZodNumber>;
                                    line: z.ZodString;
                                    beforeContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                                    afterContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                                }, "strip", z.ZodTypeAny, {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }, {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }>, "many">;
                                totalMatches: z.ZodNumber;
                            }, "strip", z.ZodTypeAny, {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            }, {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            }>;
                        }, "strip", z.ZodTypeAny, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        }, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        }>, z.ZodObject<{
                            type: z.ZodLiteral<"files">;
                            output: z.ZodObject<{
                                files: z.ZodArray<z.ZodString, "many">;
                                count: z.ZodNumber;
                            }, "strip", z.ZodTypeAny, {
                                count: number;
                                files: string[];
                            }, {
                                count: number;
                                files: string[];
                            }>;
                        }, "strip", z.ZodTypeAny, {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        }, {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        }>, z.ZodObject<{
                            type: z.ZodLiteral<"count">;
                            output: z.ZodObject<{
                                counts: z.ZodArray<z.ZodObject<{
                                    file: z.ZodString;
                                    count: z.ZodNumber;
                                }, "strip", z.ZodTypeAny, {
                                    count: number;
                                    file: string;
                                }, {
                                    count: number;
                                    file: string;
                                }>, "many">;
                                total: z.ZodNumber;
                            }, "strip", z.ZodTypeAny, {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            }, {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            }>;
                        }, "strip", z.ZodTypeAny, {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }, {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }>]>>>;
                        activeEditorResult: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                            type: z.ZodLiteral<"content">;
                            output: z.ZodObject<{
                                matches: z.ZodArray<z.ZodObject<{
                                    file: z.ZodString;
                                    lineNumber: z.ZodOptional<z.ZodNumber>;
                                    line: z.ZodString;
                                    beforeContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                                    afterContext: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                                }, "strip", z.ZodTypeAny, {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }, {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }>, "many">;
                                totalMatches: z.ZodNumber;
                            }, "strip", z.ZodTypeAny, {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            }, {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            }>;
                        }, "strip", z.ZodTypeAny, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        }, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        }>, z.ZodObject<{
                            type: z.ZodLiteral<"files">;
                            output: z.ZodObject<{
                                files: z.ZodArray<z.ZodString, "many">;
                                count: z.ZodNumber;
                            }, "strip", z.ZodTypeAny, {
                                count: number;
                                files: string[];
                            }, {
                                count: number;
                                files: string[];
                            }>;
                        }, "strip", z.ZodTypeAny, {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        }, {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        }>, z.ZodObject<{
                            type: z.ZodLiteral<"count">;
                            output: z.ZodObject<{
                                counts: z.ZodArray<z.ZodObject<{
                                    file: z.ZodString;
                                    count: z.ZodNumber;
                                }, "strip", z.ZodTypeAny, {
                                    count: number;
                                    file: string;
                                }, {
                                    count: number;
                                    file: string;
                                }>, "many">;
                                total: z.ZodNumber;
                            }, "strip", z.ZodTypeAny, {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            }, {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            }>;
                        }, "strip", z.ZodTypeAny, {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }, {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }>]>>;
                    }, "strip", z.ZodTypeAny, {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    }, {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    };
                    status: "success";
                }, {
                    value: {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "grep";
                args: {
                    pattern: string;
                    sort?: string | undefined;
                    context?: number | undefined;
                    path?: string | undefined;
                    type?: string | undefined;
                    glob?: string | undefined;
                    outputMode?: string | undefined;
                    contextBefore?: number | undefined;
                    contextAfter?: number | undefined;
                    caseInsensitive?: boolean | undefined;
                    headLimit?: number | undefined;
                    multiline?: boolean | undefined;
                    sortAscending?: boolean | undefined;
                    offset?: number | undefined;
                };
                result?: {
                    value: {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "grep";
                args: {
                    pattern: string;
                    sort?: string | undefined;
                    context?: number | undefined;
                    path?: string | undefined;
                    type?: string | undefined;
                    glob?: string | undefined;
                    outputMode?: string | undefined;
                    contextBefore?: number | undefined;
                    contextAfter?: number | undefined;
                    caseInsensitive?: boolean | undefined;
                    headLimit?: number | undefined;
                    multiline?: boolean | undefined;
                    sortAscending?: boolean | undefined;
                    offset?: number | undefined;
                };
                result?: {
                    value: {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"read">;
                args: z.ZodObject<{
                    path: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                }, {
                    path: string;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        content: z.ZodString;
                        totalLines: z.ZodNumber;
                        fileSize: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    }, {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    };
                    status: "success";
                }, {
                    value: {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "read";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "read";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"edit">;
                args: z.ZodObject<{
                    path: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                }, {
                    path: string;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        linesAdded: z.ZodOptional<z.ZodNumber>;
                        linesRemoved: z.ZodOptional<z.ZodNumber>;
                        diffString: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    }, {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    };
                    status: "success";
                }, {
                    value: {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "edit";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "edit";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"ls">;
                args: z.ZodObject<{
                    path: z.ZodString;
                    ignore: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    ignore?: string[] | undefined;
                }, {
                    path: string;
                    ignore?: string[] | undefined;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        directoryTreeRoot: z.ZodType<import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode, z.ZodTypeDef, import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode>;
                    }, "strip", z.ZodTypeAny, {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    }, {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    };
                    status: "success";
                }, {
                    value: {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "ls";
                args: {
                    path: string;
                    ignore?: string[] | undefined;
                };
                result?: {
                    value: {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "ls";
                args: {
                    path: string;
                    ignore?: string[] | undefined;
                };
                result?: {
                    value: {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"readLints">;
                args: z.ZodObject<{
                    paths: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    paths: string[];
                }, {
                    paths: string[];
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        fileDiagnostics: z.ZodArray<z.ZodObject<{
                            path: z.ZodString;
                            diagnostics: z.ZodArray<z.ZodObject<{
                                severity: z.ZodEnum<["error", "warning", "information", "hint"]>;
                                range: z.ZodOptional<z.ZodObject<{
                                    start: z.ZodOptional<z.ZodObject<{
                                        line: z.ZodOptional<z.ZodNumber>;
                                        character: z.ZodOptional<z.ZodNumber>;
                                    }, "strip", z.ZodTypeAny, {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    }, {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    }>>;
                                    end: z.ZodOptional<z.ZodObject<{
                                        line: z.ZodOptional<z.ZodNumber>;
                                        character: z.ZodOptional<z.ZodNumber>;
                                    }, "strip", z.ZodTypeAny, {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    }, {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    }>>;
                                }, "strip", z.ZodTypeAny, {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                }, {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                }>>;
                                message: z.ZodString;
                                source: z.ZodString;
                                code: z.ZodString;
                            }, "strip", z.ZodTypeAny, {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }, {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }>, "many">;
                            diagnosticsCount: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }, {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }>, "many">;
                        totalFiles: z.ZodNumber;
                        totalDiagnostics: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    }, {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    };
                    status: "success";
                }, {
                    value: {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "readLints";
                args: {
                    paths: string[];
                };
                result?: {
                    value: {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "readLints";
                args: {
                    paths: string[];
                };
                result?: {
                    value: {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"mcp">;
                args: z.ZodObject<{
                    args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    providerIdentifier: z.ZodOptional<z.ZodString>;
                    toolName: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    args?: Record<string, unknown> | undefined;
                    providerIdentifier?: string | undefined;
                    toolName?: string | undefined;
                }, {
                    args?: Record<string, unknown> | undefined;
                    providerIdentifier?: string | undefined;
                    toolName?: string | undefined;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        content: z.ZodArray<z.ZodObject<{
                            text: z.ZodOptional<z.ZodObject<{
                                text: z.ZodString;
                            }, "strip", z.ZodTypeAny, {
                                text: string;
                            }, {
                                text: string;
                            }>>;
                            image: z.ZodOptional<z.ZodObject<{
                                data: z.ZodString;
                                mimeType: z.ZodOptional<z.ZodString>;
                            }, "strip", z.ZodTypeAny, {
                                data: string;
                                mimeType?: string | undefined;
                            }, {
                                data: string;
                                mimeType?: string | undefined;
                            }>>;
                        }, "strip", z.ZodTypeAny, {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }, {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }>, "many">;
                        isError: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    }, {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    };
                    status: "success";
                }, {
                    value: {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "mcp";
                args: {
                    args?: Record<string, unknown> | undefined;
                    providerIdentifier?: string | undefined;
                    toolName?: string | undefined;
                };
                result?: {
                    value: {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "mcp";
                args: {
                    args?: Record<string, unknown> | undefined;
                    providerIdentifier?: string | undefined;
                    toolName?: string | undefined;
                };
                result?: {
                    value: {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"generateImage">;
                args: z.ZodObject<{
                    description: z.ZodString;
                    filePath: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    description: string;
                    filePath?: string | undefined;
                }, {
                    description: string;
                    filePath?: string | undefined;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        filePath: z.ZodString;
                        imageData: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        filePath: string;
                        imageData: string;
                    }, {
                        filePath: string;
                        imageData: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        filePath: string;
                        imageData: string;
                    };
                    status: "success";
                }, {
                    value: {
                        filePath: string;
                        imageData: string;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "generateImage";
                args: {
                    description: string;
                    filePath?: string | undefined;
                };
                result?: {
                    value: {
                        filePath: string;
                        imageData: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "generateImage";
                args: {
                    description: string;
                    filePath?: string | undefined;
                };
                result?: {
                    value: {
                        filePath: string;
                        imageData: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"recordScreen">;
                args: z.ZodObject<{
                    mode: z.ZodEnum<["START_RECORDING", "SAVE_RECORDING", "DISCARD_RECORDING"]>;
                }, "strip", z.ZodTypeAny, {
                    mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
                }, {
                    mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        wasPriorRecordingCancelled: z.ZodOptional<z.ZodBoolean>;
                        path: z.ZodOptional<z.ZodString>;
                        recordingDurationMs: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    }, {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    };
                    status: "success";
                }, {
                    value: {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "recordScreen";
                args: {
                    mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
                };
                result?: {
                    value: {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "recordScreen";
                args: {
                    mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
                };
                result?: {
                    value: {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"semSearch">;
                args: z.ZodObject<{
                    query: z.ZodString;
                    targetDirectories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    explanation: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    query: string;
                    targetDirectories?: string[] | undefined;
                    explanation?: string | undefined;
                }, {
                    query: string;
                    targetDirectories?: string[] | undefined;
                    explanation?: string | undefined;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        results: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        results: string;
                    }, {
                        results: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        results: string;
                    };
                    status: "success";
                }, {
                    value: {
                        results: string;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "semSearch";
                args: {
                    query: string;
                    targetDirectories?: string[] | undefined;
                    explanation?: string | undefined;
                };
                result?: {
                    value: {
                        results: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "semSearch";
                args: {
                    query: string;
                    targetDirectories?: string[] | undefined;
                    explanation?: string | undefined;
                };
                result?: {
                    value: {
                        results: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"createPlan">;
                args: z.ZodObject<{
                    plan: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    plan: string;
                }, {
                    plan: string;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    value: {};
                    status: "success";
                }, {
                    value: {};
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "createPlan";
                args: {
                    plan: string;
                };
                result?: {
                    value: {};
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "createPlan";
                args: {
                    plan: string;
                };
                result?: {
                    value: {};
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"updateTodos">;
                args: z.ZodObject<{
                    todos: z.ZodArray<z.ZodObject<{
                        content: z.ZodString;
                        status: z.ZodEnum<["pending", "inProgress", "completed", "cancelled"]>;
                    }, "strip", z.ZodTypeAny, {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }, {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                }, {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        todos: z.ZodArray<z.ZodObject<{
                            content: z.ZodString;
                            status: z.ZodEnum<["pending", "inProgress", "completed", "cancelled"]>;
                        }, "strip", z.ZodTypeAny, {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }, {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }>, "many">;
                        totalCount: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    }, {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    };
                    status: "success";
                }, {
                    value: {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "updateTodos";
                args: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                };
                result?: {
                    value: {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "updateTodos";
                args: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                };
                result?: {
                    value: {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"task">;
                args: z.ZodObject<{
                    description: z.ZodString;
                    prompt: z.ZodString;
                    subagentType: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodString;
                        name: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        kind: string;
                        name?: string | undefined;
                    }, {
                        kind: string;
                        name?: string | undefined;
                    }>>;
                    model: z.ZodOptional<z.ZodString>;
                    resume: z.ZodOptional<z.ZodString>;
                    agentId: z.ZodOptional<z.ZodString>;
                    attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    mode: z.ZodOptional<z.ZodEnum<["unspecified", "agent", "plan"]>>;
                    respondingToMessageIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    description: string;
                    prompt: string;
                    resume?: string | undefined;
                    agentId?: string | undefined;
                    mode?: "plan" | "unspecified" | "agent" | undefined;
                    subagentType?: {
                        kind: string;
                        name?: string | undefined;
                    } | undefined;
                    model?: string | undefined;
                    attachments?: string[] | undefined;
                    respondingToMessageIds?: string[] | undefined;
                }, {
                    description: string;
                    prompt: string;
                    resume?: string | undefined;
                    agentId?: string | undefined;
                    mode?: "plan" | "unspecified" | "agent" | undefined;
                    subagentType?: {
                        kind: string;
                        name?: string | undefined;
                    } | undefined;
                    model?: string | undefined;
                    attachments?: string[] | undefined;
                    respondingToMessageIds?: string[] | undefined;
                }>;
                result: z.ZodOptional<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
                    status: z.ZodLiteral<"success">;
                    value: z.ZodObject<{
                        conversationSteps: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
                        agentId: z.ZodOptional<z.ZodString>;
                        isBackground: z.ZodBoolean;
                        durationMs: z.ZodOptional<z.ZodNumber>;
                        resultSuffix: z.ZodOptional<z.ZodString>;
                        backgroundReason: z.ZodEnum<["unspecified", "agentRequest", "userRequest", "queuedFollowUp"]>;
                        transcriptPath: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    }, {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    };
                    status: "success";
                }, {
                    value: {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    };
                    status: "success";
                }>, z.ZodObject<{
                    status: z.ZodLiteral<"error">;
                    error: z.ZodTypeAny;
                }, "strip", z.ZodTypeAny, {
                    status: "error";
                    error?: any;
                }, {
                    status: "error";
                    error?: any;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                type: "task";
                args: {
                    description: string;
                    prompt: string;
                    resume?: string | undefined;
                    agentId?: string | undefined;
                    mode?: "plan" | "unspecified" | "agent" | undefined;
                    subagentType?: {
                        kind: string;
                        name?: string | undefined;
                    } | undefined;
                    model?: string | undefined;
                    attachments?: string[] | undefined;
                    respondingToMessageIds?: string[] | undefined;
                };
                result?: {
                    value: {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }, {
                type: "task";
                args: {
                    description: string;
                    prompt: string;
                    resume?: string | undefined;
                    agentId?: string | undefined;
                    mode?: "plan" | "unspecified" | "agent" | undefined;
                    subagentType?: {
                        kind: string;
                        name?: string | undefined;
                    } | undefined;
                    model?: string | undefined;
                    attachments?: string[] | undefined;
                    respondingToMessageIds?: string[] | undefined;
                };
                result?: {
                    value: {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            message: {
                type: "shell";
                args: {
                    command: string;
                    timeout?: number | undefined;
                    workingDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "write";
                args: {
                    path: string;
                    fileText: string;
                    returnFileContentAfterWrite?: boolean | undefined;
                };
                result?: {
                    value: {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "delete";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "glob";
                args: {
                    globPattern: string;
                    targetDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "grep";
                args: {
                    pattern: string;
                    sort?: string | undefined;
                    context?: number | undefined;
                    path?: string | undefined;
                    type?: string | undefined;
                    glob?: string | undefined;
                    outputMode?: string | undefined;
                    contextBefore?: number | undefined;
                    contextAfter?: number | undefined;
                    caseInsensitive?: boolean | undefined;
                    headLimit?: number | undefined;
                    multiline?: boolean | undefined;
                    sortAscending?: boolean | undefined;
                    offset?: number | undefined;
                };
                result?: {
                    value: {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "read";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "edit";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "ls";
                args: {
                    path: string;
                    ignore?: string[] | undefined;
                };
                result?: {
                    value: {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "readLints";
                args: {
                    paths: string[];
                };
                result?: {
                    value: {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "mcp";
                args: {
                    args?: Record<string, unknown> | undefined;
                    providerIdentifier?: string | undefined;
                    toolName?: string | undefined;
                };
                result?: {
                    value: {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "semSearch";
                args: {
                    query: string;
                    targetDirectories?: string[] | undefined;
                    explanation?: string | undefined;
                };
                result?: {
                    value: {
                        results: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "generateImage";
                args: {
                    description: string;
                    filePath?: string | undefined;
                };
                result?: {
                    value: {
                        filePath: string;
                        imageData: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "createPlan";
                args: {
                    plan: string;
                };
                result?: {
                    value: {};
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "recordScreen";
                args: {
                    mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
                };
                result?: {
                    value: {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "updateTodos";
                args: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                };
                result?: {
                    value: {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "task";
                args: {
                    description: string;
                    prompt: string;
                    resume?: string | undefined;
                    agentId?: string | undefined;
                    mode?: "plan" | "unspecified" | "agent" | undefined;
                    subagentType?: {
                        kind: string;
                        name?: string | undefined;
                    } | undefined;
                    model?: string | undefined;
                    attachments?: string[] | undefined;
                    respondingToMessageIds?: string[] | undefined;
                };
                result?: {
                    value: {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            };
            type: "toolCall";
        }, {
            message: {
                type: "shell";
                args: {
                    command: string;
                    timeout?: number | undefined;
                    workingDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "write";
                args: {
                    path: string;
                    fileText: string;
                    returnFileContentAfterWrite?: boolean | undefined;
                };
                result?: {
                    value: {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "delete";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "glob";
                args: {
                    globPattern: string;
                    targetDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "grep";
                args: {
                    pattern: string;
                    sort?: string | undefined;
                    context?: number | undefined;
                    path?: string | undefined;
                    type?: string | undefined;
                    glob?: string | undefined;
                    outputMode?: string | undefined;
                    contextBefore?: number | undefined;
                    contextAfter?: number | undefined;
                    caseInsensitive?: boolean | undefined;
                    headLimit?: number | undefined;
                    multiline?: boolean | undefined;
                    sortAscending?: boolean | undefined;
                    offset?: number | undefined;
                };
                result?: {
                    value: {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "read";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "edit";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "ls";
                args: {
                    path: string;
                    ignore?: string[] | undefined;
                };
                result?: {
                    value: {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "readLints";
                args: {
                    paths: string[];
                };
                result?: {
                    value: {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "mcp";
                args: {
                    args?: Record<string, unknown> | undefined;
                    providerIdentifier?: string | undefined;
                    toolName?: string | undefined;
                };
                result?: {
                    value: {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "semSearch";
                args: {
                    query: string;
                    targetDirectories?: string[] | undefined;
                    explanation?: string | undefined;
                };
                result?: {
                    value: {
                        results: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "generateImage";
                args: {
                    description: string;
                    filePath?: string | undefined;
                };
                result?: {
                    value: {
                        filePath: string;
                        imageData: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "createPlan";
                args: {
                    plan: string;
                };
                result?: {
                    value: {};
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "recordScreen";
                args: {
                    mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
                };
                result?: {
                    value: {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "updateTodos";
                args: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                };
                result?: {
                    value: {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "task";
                args: {
                    description: string;
                    prompt: string;
                    resume?: string | undefined;
                    agentId?: string | undefined;
                    mode?: "plan" | "unspecified" | "agent" | undefined;
                    subagentType?: {
                        kind: string;
                        name?: string | undefined;
                    } | undefined;
                    model?: string | undefined;
                    attachments?: string[] | undefined;
                    respondingToMessageIds?: string[] | undefined;
                };
                result?: {
                    value: {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            };
            type: "toolCall";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"thinkingMessage">;
            message: z.ZodObject<{
                text: z.ZodString;
                thinkingDurationMs: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                text: string;
                thinkingDurationMs?: number | undefined;
            }, {
                text: string;
                thinkingDurationMs?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            message: {
                text: string;
                thinkingDurationMs?: number | undefined;
            };
            type: "thinkingMessage";
        }, {
            message: {
                text: string;
                thinkingDurationMs?: number | undefined;
            };
            type: "thinkingMessage";
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        steps: ({
            message: {
                text: string;
            };
            type: "assistantMessage";
        } | {
            message: {
                type: "shell";
                args: {
                    command: string;
                    timeout?: number | undefined;
                    workingDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "write";
                args: {
                    path: string;
                    fileText: string;
                    returnFileContentAfterWrite?: boolean | undefined;
                };
                result?: {
                    value: {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "delete";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "glob";
                args: {
                    globPattern: string;
                    targetDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "grep";
                args: {
                    pattern: string;
                    sort?: string | undefined;
                    context?: number | undefined;
                    path?: string | undefined;
                    type?: string | undefined;
                    glob?: string | undefined;
                    outputMode?: string | undefined;
                    contextBefore?: number | undefined;
                    contextAfter?: number | undefined;
                    caseInsensitive?: boolean | undefined;
                    headLimit?: number | undefined;
                    multiline?: boolean | undefined;
                    sortAscending?: boolean | undefined;
                    offset?: number | undefined;
                };
                result?: {
                    value: {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "read";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "edit";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "ls";
                args: {
                    path: string;
                    ignore?: string[] | undefined;
                };
                result?: {
                    value: {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "readLints";
                args: {
                    paths: string[];
                };
                result?: {
                    value: {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "mcp";
                args: {
                    args?: Record<string, unknown> | undefined;
                    providerIdentifier?: string | undefined;
                    toolName?: string | undefined;
                };
                result?: {
                    value: {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "semSearch";
                args: {
                    query: string;
                    targetDirectories?: string[] | undefined;
                    explanation?: string | undefined;
                };
                result?: {
                    value: {
                        results: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "generateImage";
                args: {
                    description: string;
                    filePath?: string | undefined;
                };
                result?: {
                    value: {
                        filePath: string;
                        imageData: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "createPlan";
                args: {
                    plan: string;
                };
                result?: {
                    value: {};
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "recordScreen";
                args: {
                    mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
                };
                result?: {
                    value: {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "updateTodos";
                args: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                };
                result?: {
                    value: {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "task";
                args: {
                    description: string;
                    prompt: string;
                    resume?: string | undefined;
                    agentId?: string | undefined;
                    mode?: "plan" | "unspecified" | "agent" | undefined;
                    subagentType?: {
                        kind: string;
                        name?: string | undefined;
                    } | undefined;
                    model?: string | undefined;
                    attachments?: string[] | undefined;
                    respondingToMessageIds?: string[] | undefined;
                };
                result?: {
                    value: {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            };
            type: "toolCall";
        } | {
            message: {
                text: string;
                thinkingDurationMs?: number | undefined;
            };
            type: "thinkingMessage";
        })[];
        userMessage?: {
            text: string;
        } | undefined;
    }, {
        steps: ({
            message: {
                text: string;
            };
            type: "assistantMessage";
        } | {
            message: {
                type: "shell";
                args: {
                    command: string;
                    timeout?: number | undefined;
                    workingDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "write";
                args: {
                    path: string;
                    fileText: string;
                    returnFileContentAfterWrite?: boolean | undefined;
                };
                result?: {
                    value: {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "delete";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "glob";
                args: {
                    globPattern: string;
                    targetDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "grep";
                args: {
                    pattern: string;
                    sort?: string | undefined;
                    context?: number | undefined;
                    path?: string | undefined;
                    type?: string | undefined;
                    glob?: string | undefined;
                    outputMode?: string | undefined;
                    contextBefore?: number | undefined;
                    contextAfter?: number | undefined;
                    caseInsensitive?: boolean | undefined;
                    headLimit?: number | undefined;
                    multiline?: boolean | undefined;
                    sortAscending?: boolean | undefined;
                    offset?: number | undefined;
                };
                result?: {
                    value: {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "read";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "edit";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "ls";
                args: {
                    path: string;
                    ignore?: string[] | undefined;
                };
                result?: {
                    value: {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "readLints";
                args: {
                    paths: string[];
                };
                result?: {
                    value: {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "mcp";
                args: {
                    args?: Record<string, unknown> | undefined;
                    providerIdentifier?: string | undefined;
                    toolName?: string | undefined;
                };
                result?: {
                    value: {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "semSearch";
                args: {
                    query: string;
                    targetDirectories?: string[] | undefined;
                    explanation?: string | undefined;
                };
                result?: {
                    value: {
                        results: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "generateImage";
                args: {
                    description: string;
                    filePath?: string | undefined;
                };
                result?: {
                    value: {
                        filePath: string;
                        imageData: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "createPlan";
                args: {
                    plan: string;
                };
                result?: {
                    value: {};
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "recordScreen";
                args: {
                    mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
                };
                result?: {
                    value: {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "updateTodos";
                args: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                };
                result?: {
                    value: {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "task";
                args: {
                    description: string;
                    prompt: string;
                    resume?: string | undefined;
                    agentId?: string | undefined;
                    mode?: "plan" | "unspecified" | "agent" | undefined;
                    subagentType?: {
                        kind: string;
                        name?: string | undefined;
                    } | undefined;
                    model?: string | undefined;
                    attachments?: string[] | undefined;
                    respondingToMessageIds?: string[] | undefined;
                };
                result?: {
                    value: {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            };
            type: "toolCall";
        } | {
            message: {
                text: string;
                thinkingDurationMs?: number | undefined;
            };
            type: "thinkingMessage";
        })[];
        userMessage?: {
            text: string;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "agentConversationTurn";
    turn: {
        steps: ({
            message: {
                text: string;
            };
            type: "assistantMessage";
        } | {
            message: {
                type: "shell";
                args: {
                    command: string;
                    timeout?: number | undefined;
                    workingDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "write";
                args: {
                    path: string;
                    fileText: string;
                    returnFileContentAfterWrite?: boolean | undefined;
                };
                result?: {
                    value: {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "delete";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "glob";
                args: {
                    globPattern: string;
                    targetDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "grep";
                args: {
                    pattern: string;
                    sort?: string | undefined;
                    context?: number | undefined;
                    path?: string | undefined;
                    type?: string | undefined;
                    glob?: string | undefined;
                    outputMode?: string | undefined;
                    contextBefore?: number | undefined;
                    contextAfter?: number | undefined;
                    caseInsensitive?: boolean | undefined;
                    headLimit?: number | undefined;
                    multiline?: boolean | undefined;
                    sortAscending?: boolean | undefined;
                    offset?: number | undefined;
                };
                result?: {
                    value: {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "read";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "edit";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "ls";
                args: {
                    path: string;
                    ignore?: string[] | undefined;
                };
                result?: {
                    value: {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "readLints";
                args: {
                    paths: string[];
                };
                result?: {
                    value: {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "mcp";
                args: {
                    args?: Record<string, unknown> | undefined;
                    providerIdentifier?: string | undefined;
                    toolName?: string | undefined;
                };
                result?: {
                    value: {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "semSearch";
                args: {
                    query: string;
                    targetDirectories?: string[] | undefined;
                    explanation?: string | undefined;
                };
                result?: {
                    value: {
                        results: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "generateImage";
                args: {
                    description: string;
                    filePath?: string | undefined;
                };
                result?: {
                    value: {
                        filePath: string;
                        imageData: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "createPlan";
                args: {
                    plan: string;
                };
                result?: {
                    value: {};
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "recordScreen";
                args: {
                    mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
                };
                result?: {
                    value: {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "updateTodos";
                args: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                };
                result?: {
                    value: {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "task";
                args: {
                    description: string;
                    prompt: string;
                    resume?: string | undefined;
                    agentId?: string | undefined;
                    mode?: "plan" | "unspecified" | "agent" | undefined;
                    subagentType?: {
                        kind: string;
                        name?: string | undefined;
                    } | undefined;
                    model?: string | undefined;
                    attachments?: string[] | undefined;
                    respondingToMessageIds?: string[] | undefined;
                };
                result?: {
                    value: {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            };
            type: "toolCall";
        } | {
            message: {
                text: string;
                thinkingDurationMs?: number | undefined;
            };
            type: "thinkingMessage";
        })[];
        userMessage?: {
            text: string;
        } | undefined;
    };
}, {
    type: "agentConversationTurn";
    turn: {
        steps: ({
            message: {
                text: string;
            };
            type: "assistantMessage";
        } | {
            message: {
                type: "shell";
                args: {
                    command: string;
                    timeout?: number | undefined;
                    workingDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        signal: string;
                        stdout: string;
                        stderr: string;
                        exitCode: number;
                        executionTime: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "write";
                args: {
                    path: string;
                    fileText: string;
                    returnFileContentAfterWrite?: boolean | undefined;
                };
                result?: {
                    value: {
                        path: string;
                        fileSize: number;
                        linesCreated: number;
                        fileContentAfterWrite?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "delete";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "glob";
                args: {
                    globPattern: string;
                    targetDirectory?: string | undefined;
                };
                result?: {
                    value: {
                        files: string[];
                        totalFiles: number;
                        clientTruncated: boolean;
                        ripgrepTruncated: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "grep";
                args: {
                    pattern: string;
                    sort?: string | undefined;
                    context?: number | undefined;
                    path?: string | undefined;
                    type?: string | undefined;
                    glob?: string | undefined;
                    outputMode?: string | undefined;
                    contextBefore?: number | undefined;
                    contextAfter?: number | undefined;
                    caseInsensitive?: boolean | undefined;
                    headLimit?: number | undefined;
                    multiline?: boolean | undefined;
                    sortAscending?: boolean | undefined;
                    offset?: number | undefined;
                };
                result?: {
                    value: {
                        workspaceResults?: Record<string, {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        }> | undefined;
                        activeEditorResult?: {
                            type: "content";
                            output: {
                                totalMatches: number;
                                matches: {
                                    file: string;
                                    line: string;
                                    lineNumber?: number | undefined;
                                    beforeContext?: string[] | undefined;
                                    afterContext?: string[] | undefined;
                                }[];
                            };
                        } | {
                            type: "files";
                            output: {
                                count: number;
                                files: string[];
                            };
                        } | {
                            type: "count";
                            output: {
                                counts: {
                                    count: number;
                                    file: string;
                                }[];
                                total: number;
                            };
                        } | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "read";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        content: string;
                        totalLines: number;
                        fileSize: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "edit";
                args: {
                    path: string;
                };
                result?: {
                    value: {
                        linesAdded?: number | undefined;
                        linesRemoved?: number | undefined;
                        diffString?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "ls";
                args: {
                    path: string;
                    ignore?: string[] | undefined;
                };
                result?: {
                    value: {
                        directoryTreeRoot: import("@anysphere/cursor-sdk-shared/tool-call-types").LsDirectoryTreeNode;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "readLints";
                args: {
                    paths: string[];
                };
                result?: {
                    value: {
                        totalFiles: number;
                        fileDiagnostics: {
                            path: string;
                            diagnostics: {
                                message: string;
                                code: string;
                                source: string;
                                severity: "error" | "hint" | "warning" | "information";
                                range?: {
                                    start?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                    end?: {
                                        line?: number | undefined;
                                        character?: number | undefined;
                                    } | undefined;
                                } | undefined;
                            }[];
                            diagnosticsCount: number;
                        }[];
                        totalDiagnostics: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "mcp";
                args: {
                    args?: Record<string, unknown> | undefined;
                    providerIdentifier?: string | undefined;
                    toolName?: string | undefined;
                };
                result?: {
                    value: {
                        content: {
                            text?: {
                                text: string;
                            } | undefined;
                            image?: {
                                data: string;
                                mimeType?: string | undefined;
                            } | undefined;
                        }[];
                        isError: boolean;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "semSearch";
                args: {
                    query: string;
                    targetDirectories?: string[] | undefined;
                    explanation?: string | undefined;
                };
                result?: {
                    value: {
                        results: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "generateImage";
                args: {
                    description: string;
                    filePath?: string | undefined;
                };
                result?: {
                    value: {
                        filePath: string;
                        imageData: string;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "createPlan";
                args: {
                    plan: string;
                };
                result?: {
                    value: {};
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "recordScreen";
                args: {
                    mode: "START_RECORDING" | "SAVE_RECORDING" | "DISCARD_RECORDING";
                };
                result?: {
                    value: {
                        path?: string | undefined;
                        wasPriorRecordingCancelled?: boolean | undefined;
                        recordingDurationMs?: number | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "updateTodos";
                args: {
                    todos: {
                        status: "cancelled" | "completed" | "pending" | "inProgress";
                        content: string;
                    }[];
                };
                result?: {
                    value: {
                        todos: {
                            status: "cancelled" | "completed" | "pending" | "inProgress";
                            content: string;
                        }[];
                        totalCount: number;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            } | {
                type: "task";
                args: {
                    description: string;
                    prompt: string;
                    resume?: string | undefined;
                    agentId?: string | undefined;
                    mode?: "plan" | "unspecified" | "agent" | undefined;
                    subagentType?: {
                        kind: string;
                        name?: string | undefined;
                    } | undefined;
                    model?: string | undefined;
                    attachments?: string[] | undefined;
                    respondingToMessageIds?: string[] | undefined;
                };
                result?: {
                    value: {
                        isBackground: boolean;
                        backgroundReason: "unspecified" | "agentRequest" | "userRequest" | "queuedFollowUp";
                        agentId?: string | undefined;
                        durationMs?: number | undefined;
                        conversationSteps?: unknown[] | undefined;
                        resultSuffix?: string | undefined;
                        transcriptPath?: string | undefined;
                    };
                    status: "success";
                } | {
                    status: "error";
                    error?: any;
                } | undefined;
            };
            type: "toolCall";
        } | {
            message: {
                text: string;
                thinkingDurationMs?: number | undefined;
            };
            type: "thinkingMessage";
        })[];
        userMessage?: {
            text: string;
        } | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"shellConversationTurn">;
    turn: z.ZodObject<{
        shellCommand: z.ZodOptional<z.ZodObject<{
            command: z.ZodString;
            workingDirectory: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            command: string;
            workingDirectory?: string | undefined;
        }, {
            command: string;
            workingDirectory?: string | undefined;
        }>>;
        shellOutput: z.ZodOptional<z.ZodObject<{
            stdout: z.ZodString;
            stderr: z.ZodString;
            exitCode: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            stdout: string;
            stderr: string;
            exitCode: number;
        }, {
            stdout: string;
            stderr: string;
            exitCode: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        shellCommand?: {
            command: string;
            workingDirectory?: string | undefined;
        } | undefined;
        shellOutput?: {
            stdout: string;
            stderr: string;
            exitCode: number;
        } | undefined;
    }, {
        shellCommand?: {
            command: string;
            workingDirectory?: string | undefined;
        } | undefined;
        shellOutput?: {
            stdout: string;
            stderr: string;
            exitCode: number;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "shellConversationTurn";
    turn: {
        shellCommand?: {
            command: string;
            workingDirectory?: string | undefined;
        } | undefined;
        shellOutput?: {
            stdout: string;
            stderr: string;
            exitCode: number;
        } | undefined;
    };
}, {
    type: "shellConversationTurn";
    turn: {
        shellCommand?: {
            command: string;
            workingDirectory?: string | undefined;
        } | undefined;
        shellOutput?: {
            stdout: string;
            stderr: string;
            exitCode: number;
        } | undefined;
    };
}>]>;
export type AssistantMessage = z.infer<typeof AssistantMessageSchema>;
export type ThinkingMessage = z.infer<typeof ThinkingMessageSchema>;
export type UserMessage = z.infer<typeof UserMessageSchema>;
export type ShellCommand = z.infer<typeof ShellCommandSchema>;
export type ShellOutput = z.infer<typeof ShellOutputSchema>;
export type ConversationStep = z.infer<typeof ConversationStepSchema>;
export type AgentConversationTurn = z.infer<typeof AgentConversationTurnSchema>;
export type ShellConversationTurn = z.infer<typeof ShellConversationTurnSchema>;
export type ConversationTurn = z.infer<typeof ConversationTurnSchema>;
//# sourceMappingURL=conversation-types.d.ts.map