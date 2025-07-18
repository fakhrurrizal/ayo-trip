import { colors } from '@/utils'
import { alpha, createTheme } from '@mui/material/styles'
import { useMemo } from 'react'

export const useGetTheme = () => {
    const primary = '#116487'

    const error = '#ff3a6e'
    const backgroundColor = '#FFFFFF'

    const borderRadius = 4

    const fontColor = '#474955'

    const fontDark = primary

    const useTheme = useMemo(
        () =>
            createTheme({
                shape: {
                    borderRadius,
                },

                palette: {
                    mode: 'light',

                    primary: {
                        main: primary,
                    },

                    error: {
                        main: error,
                    },

                    success: {
                        main: '#6fd943',
                    },

                    secondary: {
                        main: '#808080',
                    },

                    warning: {
                        main: colors.yellow[400],
                    },

                    info: {
                        main: colors.blue[300],
                    },

                    background: {
                        default: backgroundColor,
                        paper: backgroundColor,
                    },

                    mainColor: colors.slate[100],

                    fontColor,

                    text: {
                        primary: fontColor,
                        secondary: fontDark,
                    },
                },

                typography: {
                    fontSize: 13,

                    fontWeightRegular: 500,

                    allVariants: {
                        fontFamily: '"Montserrat", sans-serif',
                        // fontFamily: '"Source Sans 3", sans-serif',
                        color: fontColor,
                    },
                },

                components: {
                    MuiTextField: {
                        styleOverrides: {
                            root: {
                                fontWeight: 500,
                            },
                        },
                        defaultProps: {
                            fullWidth: true,
                        },
                    },

                    MuiInputAdornment: {
                        styleOverrides: {
                            root: {
                                '& .MuiTypography-root': {
                                    color: alpha('#000000', 0.87),
                                },
                            },
                        },
                    },

                    MuiSelect: {
                        defaultProps: {
                            fullWidth: true,
                            size: 'small',
                        },
                    },

                    MuiButton: {
                        styleOverrides: {
                            root: {
                                boxShadow: 'none',
                                textTransform: 'none',
                                fontSize: '12px',
                                ':hover': {
                                    boxShadow: 'none',
                                },
                            },
                        },
                    },

                    MuiListItemIcon: {
                        styleOverrides: {
                            root: {
                                minWidth: '38px',
                                color: 'rgba(0, 0, 0, 0.54)',
                            },
                        },
                    },

                    MuiListItem: {
                        styleOverrides: {
                            root: {
                                borderRadius: borderRadius + 'px',
                            },
                        },
                    },

                    MuiListItemButton: {
                        styleOverrides: {
                            root: {
                                borderRadius: borderRadius + 'px',

                                ':hover': {
                                    boxShadow: 'none',
                                },

                                '&.Mui-selected': {
                                    backgroundColor: alpha(primary, 0.1),

                                    '& .MuiButtonBase-root': {
                                        color: primary,
                                    },

                                    '& .MuiTypography-root': {
                                        color: primary,
                                        fontWeight: 500,
                                    },

                                    '& .MuiSvgIcon-root': {
                                        color: primary,
                                    },
                                },
                            },
                        },
                    },

                    MuiStepLabel: {
                        styleOverrides: {
                            root: {
                                '& .MuiSvgIcon-root': {
                                    width: '1.25em',
                                    height: '1.25em',
                                },
                            },
                            label: {
                                fontSize: '0.85rem',
                            },
                        },
                    },

                    MuiCard: {
                        styleOverrides: {
                            root: {
                                boxShadow: 'none',
                                backgroundImage: 'none',
                            },
                        },
                    },

                    MuiTableCell: {
                        styleOverrides: {
                            head: {
                                fontWeight: 600,
                            },
                        },
                    },

                    MuiTooltip: {
                        defaultProps: {
                            placement: 'bottom',
                        },
                        styleOverrides: {
                            tooltip: {
                                fontSize: '13px',
                                padding: '8px 12px',
                                backgroundColor: 'rgba(97, 97, 97, 0.92)',
                                borderRadius: '4px',
                                fontWeight: 400,
                                lineHeight: 1.5,
                            },
                            arrow: {
                                color: 'rgba(97, 97, 97, 0.92)',
                            },
                        },
                    },

                    MuiButtonGroup: {
                        styleOverrides: {
                            root: {
                                boxShadow: 'none',
                            },
                        },
                    },

                    MuiCardContent: {
                        styleOverrides: {
                            root: {
                                ':last-child': {
                                    paddingBottom: '16px',
                                },
                            },
                        },
                    },

                    MuiAutocomplete: {
                        styleOverrides: {
                            tag: ({ ownerState }) => ({
                                ...(ownerState.size === 'small' && {
                                    height: '22px',
                                }),
                            }),
                        },
                    },
                },
            }),

        [backgroundColor, fontColor, fontDark, primary]
    )

    return useTheme
}
