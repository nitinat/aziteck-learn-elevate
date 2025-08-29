export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      contact_info: {
        Row: {
          content: string
          created_at: string
          description: string
          display_order: number
          icon_name: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          description: string
          display_order?: number
          icon_name: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          description?: string
          display_order?: number
          icon_name?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      demo_videos: {
        Row: {
          additional_media: string | null
          category: string
          code_url: string | null
          created_at: string
          created_by: string
          demo_url: string | null
          description: string | null
          display_order: number | null
          features: string[] | null
          gif_url: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          media_type: string | null
          slides_url: string | null
          technologies: string[] | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          additional_media?: string | null
          category: string
          code_url?: string | null
          created_at?: string
          created_by: string
          demo_url?: string | null
          description?: string | null
          display_order?: number | null
          features?: string[] | null
          gif_url?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          media_type?: string | null
          slides_url?: string | null
          technologies?: string[] | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          additional_media?: string | null
          category?: string
          code_url?: string | null
          created_at?: string
          created_by?: string
          demo_url?: string | null
          description?: string | null
          display_order?: number | null
          features?: string[] | null
          gif_url?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          media_type?: string | null
          slides_url?: string | null
          technologies?: string[] | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      formula_bookmarks: {
        Row: {
          bookmark_type: string | null
          created_at: string
          explanation: string | null
          formula_content: string
          formula_title: string
          id: string
          student_id: string
          subject_name: string
          tags: string[] | null
          topic_name: string
          updated_at: string
        }
        Insert: {
          bookmark_type?: string | null
          created_at?: string
          explanation?: string | null
          formula_content: string
          formula_title: string
          id?: string
          student_id: string
          subject_name: string
          tags?: string[] | null
          topic_name: string
          updated_at?: string
        }
        Update: {
          bookmark_type?: string | null
          created_at?: string
          explanation?: string | null
          formula_content?: string
          formula_title?: string
          id?: string
          student_id?: string
          subject_name?: string
          tags?: string[] | null
          topic_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      learning_materials: {
        Row: {
          category: string
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          title: string
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          title: string
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          title?: string
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: []
      }
      learning_paths: {
        Row: {
          created_at: string
          current_topic: string | null
          id: string
          path_data: Json
          recommended_topics: string[] | null
          strong_areas: string[] | null
          student_id: string
          subject_name: string
          updated_at: string
          weak_areas: string[] | null
        }
        Insert: {
          created_at?: string
          current_topic?: string | null
          id?: string
          path_data?: Json
          recommended_topics?: string[] | null
          strong_areas?: string[] | null
          student_id: string
          subject_name: string
          updated_at?: string
          weak_areas?: string[] | null
        }
        Update: {
          created_at?: string
          current_topic?: string | null
          id?: string
          path_data?: Json
          recommended_topics?: string[] | null
          strong_areas?: string[] | null
          student_id?: string
          subject_name?: string
          updated_at?: string
          weak_areas?: string[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      project_sections: {
        Row: {
          code_output: string | null
          content: string | null
          created_at: string | null
          file_name: string | null
          id: string
          project_id: string
          section_type: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          code_output?: string | null
          content?: string | null
          created_at?: string | null
          file_name?: string | null
          id?: string
          project_id: string
          section_type: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          code_output?: string | null
          content?: string | null
          created_at?: string | null
          file_name?: string | null
          id?: string
          project_id?: string
          section_type?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string
          complexity: string
          created_at: string | null
          description: string | null
          id: string
          progress: number | null
          sector: string | null
          status: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          complexity?: string
          created_at?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          sector?: string | null
          status?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          complexity?: string
          created_at?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          sector?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      question_papers: {
        Row: {
          chapters: string[] | null
          class: string
          created_at: string
          difficulty: string | null
          exam_type: string
          id: string
          questions: Json
          subjects: string[]
          time_limit: number
          title: string
          total_questions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          chapters?: string[] | null
          class: string
          created_at?: string
          difficulty?: string | null
          exam_type: string
          id?: string
          questions: Json
          subjects: string[]
          time_limit: number
          title: string
          total_questions: number
          updated_at?: string
          user_id: string
        }
        Update: {
          chapters?: string[] | null
          class?: string
          created_at?: string
          difficulty?: string | null
          exam_type?: string
          id?: string
          questions?: Json
          subjects?: string[]
          time_limit?: number
          title?: string
          total_questions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_performance: {
        Row: {
          assessment_type: string | null
          created_at: string
          id: string
          max_score: number | null
          performance_data: Json
          score: number | null
          student_id: string
          subject_name: string
          time_taken: number | null
          topic_name: string | null
        }
        Insert: {
          assessment_type?: string | null
          created_at?: string
          id?: string
          max_score?: number | null
          performance_data?: Json
          score?: number | null
          student_id: string
          subject_name: string
          time_taken?: number | null
          topic_name?: string | null
        }
        Update: {
          assessment_type?: string | null
          created_at?: string
          id?: string
          max_score?: number | null
          performance_data?: Json
          score?: number | null
          student_id?: string
          subject_name?: string
          time_taken?: number | null
          topic_name?: string | null
        }
        Relationships: []
      }
      student_queries: {
        Row: {
          created_at: string
          id: string
          is_resolved: boolean | null
          query_text: string
          query_type: string | null
          response_text: string | null
          student_id: string
          subject_name: string | null
          topic_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_resolved?: boolean | null
          query_text: string
          query_type?: string | null
          response_text?: string | null
          student_id: string
          subject_name?: string | null
          topic_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_resolved?: boolean | null
          query_text?: string
          query_type?: string | null
          response_text?: string | null
          student_id?: string
          subject_name?: string | null
          topic_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      student_subjects: {
        Row: {
          assignment_score: number | null
          attendance_percentage: number | null
          created_at: string
          grade: string | null
          id: string
          monthly_test_score: number | null
          status: string
          student_id: string
          subject_name: string
          teacher_name: string | null
          term_exam_score: number | null
          updated_at: string
        }
        Insert: {
          assignment_score?: number | null
          attendance_percentage?: number | null
          created_at?: string
          grade?: string | null
          id?: string
          monthly_test_score?: number | null
          status?: string
          student_id: string
          subject_name: string
          teacher_name?: string | null
          term_exam_score?: number | null
          updated_at?: string
        }
        Update: {
          assignment_score?: number | null
          attendance_percentage?: number | null
          created_at?: string
          grade?: string | null
          id?: string
          monthly_test_score?: number | null
          status?: string
          student_id?: string
          subject_name?: string
          teacher_name?: string | null
          term_exam_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_subjects_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_topics: {
        Row: {
          chapter_name: string | null
          completion_percentage: number | null
          created_at: string
          difficulty_level: string | null
          id: string
          is_completed: boolean | null
          last_accessed: string | null
          notes: string | null
          student_id: string
          subject_name: string
          time_spent: number | null
          topic_name: string
          updated_at: string
        }
        Insert: {
          chapter_name?: string | null
          completion_percentage?: number | null
          created_at?: string
          difficulty_level?: string | null
          id?: string
          is_completed?: boolean | null
          last_accessed?: string | null
          notes?: string | null
          student_id: string
          subject_name: string
          time_spent?: number | null
          topic_name: string
          updated_at?: string
        }
        Update: {
          chapter_name?: string | null
          completion_percentage?: number | null
          created_at?: string
          difficulty_level?: string | null
          id?: string
          is_completed?: boolean | null
          last_accessed?: string | null
          notes?: string | null
          student_id?: string
          subject_name?: string
          time_spent?: number | null
          topic_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          avatar_url: string | null
          class: string
          created_at: string
          date_of_birth: string | null
          email: string
          enrollment_date: string
          id: string
          name: string
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string | null
          roll_no: string
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          class: string
          created_at?: string
          date_of_birth?: string | null
          email: string
          enrollment_date?: string
          id?: string
          name: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          roll_no: string
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          class?: string
          created_at?: string
          date_of_birth?: string | null
          email?: string
          enrollment_date?: string
          id?: string
          name?: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          roll_no?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_file_uploads: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          project_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          project_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          project_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_sections: string[] | null
          created_at: string | null
          id: string
          last_accessed: string | null
          project_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_sections?: string[] | null
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          project_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_sections?: string[] | null
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          project_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      test_project_access: {
        Args: { test_user_id: string }
        Returns: {
          can_see_admin: boolean
          can_see_own: boolean
          project_id: string
          project_title: string
          user_role: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "student"],
    },
  },
} as const
