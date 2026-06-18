"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Plus, X } from "lucide-react";

export default function SkillsSection() {
  const { data, setResumeData, addSkill, removeSkill } = useResumeStore();
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(data.skills);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setResumeData({ ...data, skills: items });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-xl font-bold">Skills</h2>
      </div>

      <form onSubmit={handleAddSkill} className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill (e.g. React, Python)"
          className="flex-1"
        />
        <Button type="submit" variant="secondary">
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skills-list" direction="horizontal">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef} 
              className="flex flex-wrap gap-2 pt-2"
            >
              {data.skills.map((skill, index) => (
                <Draggable key={skill.id} draggableId={skill.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...(provided.draggableProps as any)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm group border"
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                      >
                        <GripVertical className="w-3 h-3" />
                      </div>
                      <span>{skill.name}</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="text-muted-foreground hover:text-destructive focus:outline-none"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {data.skills.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
          No skills added yet. Add a skill to get started.
        </div>
      )}
    </section>
  );
}
