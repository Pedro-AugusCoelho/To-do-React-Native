import React, { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { ItemWrapper } from './ItemWrapper';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/Pen/Pen.png'

interface TaskItemProps {
    item: Task
    index: number
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, text: string) => void;
}

export function TaskItem({item, index, removeTask, toggleTaskDone, editTask}:TaskItemProps) {
    const [taskText , setTaskText] = useState(item.title);
    const [isEditing , setIsEditing] = useState(false);
    const textInputRef = useRef<TextInput>(null);

    // useEffect(() => {
    //     if (textInputRef.current) {
    //       if (isEditing) {
    //         textInputRef.current.focus();
    //       } else {
    //         textInputRef.current.blur();
    //       }
    //     }
    // }, [isEditing])

    function handleStartEditing(id: number) {
        setIsEditing(true)
      }
    
    function handleCancelEditing(id:number) {
        setTaskText(item.title)
        setIsEditing(false)
    }

    function submitEditText () {
        editTask(item.id, taskText)
        setIsEditing(false)
    }


    return (
        <>
            <ItemWrapper index={index}>
                <View>
                    <TouchableOpacity
                        testID={`button-${index}`}
                        activeOpacity={0.7}
                        style={styles.taskButton}
                        onPress={() => toggleTaskDone(item.id)}
                    >
                        <View 
                        testID={`marker-${index}`}
                        style={item.done === true ? styles.taskMarkerDone : styles.taskMarker} //TODO - use style prop 
                        >
                        { item.done && (
                            <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                            />
                        )}
                        </View>
                        {!isEditing && (
                            <Text style={item.done === true ? styles.taskTextDone : styles.taskText}>
                                {item.title}
                            </Text>
                        )}
                        {isEditing && (
                            <TextInput 
                                value={taskText}
                                editable={isEditing}
                                ref={textInputRef}
                                onChangeText={setTaskText}
                                onSubmitEditing={submitEditText} 
                                style={item.done === true ? styles.taskTextDone : styles.taskText}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={ styles.iconsContainer } >
                    { isEditing ? (
                        <TouchableOpacity
                        onPress={() => handleCancelEditing(item.id)}
                        >
                        <Icon name="x" size={24} color="#b2b2b2" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                        onPress={() => handleStartEditing(item.id)}
                        >
                        <Image source={penIcon} />
                        </TouchableOpacity>
                    ) }

                    <View 
                        style={ styles.iconsDivider }
                    />

                    <TouchableOpacity
                        disabled={isEditing}
                        onPress={() => removeTask(item.id)}
                    >
                        <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                    </TouchableOpacity>
                </View>
            </ItemWrapper>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection:'row',
        paddingRight: 24
    },
    iconsDivider: {
        paddingRight: 6
    }
})

function useEffect(arg0: () => void, arg1: any[]) {
    throw new Error('Function not implemented.');
}
